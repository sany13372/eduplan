/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@kit-edu/typography';
import { Hint } from '@src/components';
import { ComboBox, NewLabel } from '@sber-universe/om-component-library';
import { FieldWrapper } from '@src/pages/LessonSettings/components/Base/FieldWrapper';
import { NumberInput } from '@src/pages/LessonSettings/components/Base/NumberInput';
import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { scaleElementTypesStore, scaleTypesStore } from '@src/pages/LessonSettings/model';
import { useFormikContext } from 'formik';
import { ScoreInfo } from '@src/pages/LessonSettings/model/types';
import upperFirst from 'lodash/upperFirst';
import isEqual from 'lodash/isEqual';

const GradeSettingField = ({ ind, caption }: { ind: number; caption: string }) => {
  return (
    <NewLabel
      // key={e.item.id}
      label={upperFirst(caption)}
      type="default"
      variant="horizontal"
    >
      <FieldWrapper name={`gradeSettings[${ind}].val`} leftLabel="не менее" rightLabel="балла(ов)">
        <NumberInput className="max-w-[172px]" name={`gradeSettings[${ind}].val`} />
      </FieldWrapper>
    </NewLabel>
  );
};
export const GradesInfoBlock = () => {
  const scaleTypes = useStore(scaleTypesStore.$items);
  const scaleElementTypes = useStore(scaleElementTypesStore.$items);
  const { values, errors, setErrors, setFieldValue } = useFormikContext<ScoreInfo>();

  useEffect(() => {
    const idList = values.gradeSettings.map((e) => e.item.id);
    const newIdList = scaleElementTypes.filter((e) => e.gradeId === values.gradeScale.id).map((e) => e.id);
    if (!isEqual(idList, newIdList)) {
      setFieldValue(
        'gradeSettings',
        scaleElementTypes.filter((e) => e.gradeId === values.gradeScale.id).map((e) => ({ item: e, val: 0 })),
      );
      setErrors({ ...errors, gradeSettings: undefined });
    }
  }, [values.gradeScale]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Typography as="h4" fontWeight="semibold" size="16px">
          Шкала оценки
        </Typography>
        <Hint
          text="Выберите шкалу оценки и для каждого элемента укажите минимальное количество баллов, которое должен набрать обучающийся"
          maxWidth="250px"
        />
      </div>
      <div className="bg-white rounded-lg flex flex-col gap-y-4 px-6 pt-6 pb-[30px]">
        <NewLabel label="Шкала" type="default" variant="horizontal">
          <ComboBox name="gradeScale" items={scaleTypes} fullWidth matchWidth />
        </NewLabel>

        {values.gradeSettings.map((e, i) => (
          <GradeSettingField key={e.item.id} caption={e.item.caption} ind={i} />
        ))}
      </div>
    </div>
  );
};
