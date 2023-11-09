import { Form, useFormikContext } from 'formik';
import {
  ComboBox,
  FormButtonGroup,
  Input,
  Label,
  RadioGroup,
  Switch,
  MaskInput,
  DateInput,
} from '@sber-universe/om-component-library';
import React, { useEffect } from 'react';
import { Sex, StudentInfo } from '@src/pages/StudentManagement/model/types';
import { InfoPanel } from '@src/components';
import { useStore } from 'effector-react';
import { courseStore, financingSourceStore, groupsStore, sexStore } from '@src/pages/StudentManagement/model';
import { Store } from 'effector';
import { ValidationErrors } from '@utils/validation';
import { Typography } from '@kit-edu/typography';
import {useRouteMatch} from "react-router-dom";
import {ActivityGroupParams, MFE_PATH, MfeRoutes} from "@constants/routes";

export type StudentFormContentProps = {
  onReset: () => void;
  errorStore: Store<ValidationErrors>;
};
export const StudentFormContent = <T extends Partial<StudentInfo>>({
  onReset,
  errorStore,
}: StudentFormContentProps): JSX.Element => {
  const validationErrors = useStore(errorStore);
  const match = useRouteMatch<ActivityGroupParams>(`${MFE_PATH}${MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW}`)
  const { dirty, values, setStatus } = useFormikContext<T>();
  const groupId = match?.params?.groupId;

  useEffect(() => {
    setStatus(validationErrors);
  }, [validationErrors, setStatus]);

  const sexList = useStore(sexStore.$items);
  const financingSourceList = useStore(financingSourceStore.$items);
  const courseList = useStore(courseStore.$items);
  const groupList = useStore(groupsStore.$items);
  const filteredGroupList = groupId ? groupList.filter(g => g.id === groupId) : groupList;
  return (
    <Form className="space-y-6">
      <Label caption="Почта" required>
        <Input<T> name="email" placeholder="Введите адрес эл. почты" />
      </Label>
      <Label caption="Фамилия" required>
        <Input<T> name="lastName" placeholder="Введите фамилию" />
      </Label>
      <Label caption="Имя" required>
        <Input<T> name="firstName" placeholder="Введите имя" />
      </Label>
      <Label caption="Отчество">
        <Input<T> name="middleName" placeholder="Введите отчество" />
      </Label>
      <div className="flex space-x-8">
        <Label caption="Дата рождения">
          <DateInput<T> name="birthDate" />
          {/* <DatePicker<T> name="birthDate" /> */}
        </Label>
        <Label caption="Пол">
          <RadioGroup<T, Sex> name="sex" options={sexList} wrapperProps={{ className: 'flex space-x-4' }} />
        </Label>
      </div>
      <Typography as="h3" size="24px" fontWeight="semibold" className="py-4">
        Дополнительные документы
      </Typography>

      <Label caption="У обучающегося нет СНИЛС">
        <Switch<T> name="hasNotSnilsNumber" />
      </Label>
      {!values.hasNotSnilsNumber && (
        <Label caption="СНИЛС" required>
          <MaskInput<T>
            name="snilsNumber"
            placeholder="Введите номен СНИЛС"
            maskProps={{
              mask: '000-000-000 00',
              placeholderChar: 'X',
              overwrite: true,
              lazy: false,
            }}
          />
        </Label>
      )}
      <Label caption="У обучающегося нет ИНН">
        <Switch<T> name="hasNotInnNumber" />
      </Label>
      {!values.hasNotInnNumber && (
        <Label caption="ИНН" required>
          <Input<T> name="innNumber" placeholder="XXXXXXXXXXXX" />
        </Label>
      )}
      <Typography as="h3" size="24px" fontWeight="semibold" className="py-1">
        Данные обучающегося
      </Typography>
      <Label caption="Личный номер">
        <Input<T> name="personalNumber" placeholder="Введите личный номер обучающегося" />
      </Label>
      <Label caption="Номер зачетной книжки">
        <Input<T> name="bookNumber" placeholder="Введите номер зачётной книжки обучающегося" />
      </Label>
      <Label caption="Курс обучения">
        <ComboBox<T>
          name="course"
          placeholder="Выберите курс обучения"
          items={courseList}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>
      <Label caption="Источник финансирования" required>
        <ComboBox<T>
          name="financingSource"
          placeholder="Выберите источник финансирования "
          items={financingSourceList}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>
      <Label caption="Учебная группа">
        <ComboBox<T>
          name="group"
          placeholder="Выберите учебную группу "
          items={filteredGroupList}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>

      <InfoPanel
        message="Обучающийся получит письмо с уведомлением на указанную эл.почту"
        bordered={false}
        variant="positive"
      />
      <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} />
    </Form>
  );
};
