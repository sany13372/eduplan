import { useFormikContext } from 'formik';
import { ComboBox, Input, RadioGroup, MaskInput, DateInput, CheckBoxGroup } from '@sber-universe/om-component-library';
import { FormButtonGroup, Label } from '@src/components';
import React, {useEffect} from 'react';
import { StudentInfo } from './types';
import { useStore } from 'effector-react';
import { Store } from 'effector';
import { ValidationErrors } from '@utils/validation';
import { Typography } from '@kit-edu/typography';
import { Icon } from '@kit-edu/icon';
import { Reference } from '@src/types';
import { courseStore, financingSourceStore, groupsStore, sexStore } from '@src/pages/GroupManagement/model';

export type StudentFormContentProps = {
  onReset: () => void;
  errorStore: Store<ValidationErrors>;
  disabledFields?: {
    email?: boolean;
    group?: boolean;
  };
};

export const StudentFormContent = <T extends Partial<StudentInfo>>({
  onReset,
  errorStore,
  disabledFields,
}: StudentFormContentProps): JSX.Element => {
  const validationErrors = useStore(errorStore);
  const genders = useStore(sexStore.$items);
  const financingSources = useStore(financingSourceStore.$items);
  const courses = useStore(courseStore.$items);
  const groups = useStore(groupsStore.$items);
  const { dirty, values, setStatus } = useFormikContext<T>();

  useEffect(() => {
    setStatus(validationErrors);
  }, [validationErrors, setStatus]);

  return (
    <>
      <Typography as="h3" size="16px" fontWeight="semibold" className="mb-4">
        Персональные данные
      </Typography>
      <div className="px-[1.75rem] py-6 bg-white rounded flex flex-col gap-4 mb-6">
        <Label caption="Почта" required>
          <Input<T> disabled={disabledFields?.email} name="email" placeholder="Укажите адрес электронной почты" />
        </Label>
        <Label caption="Фамилия" required>
          <Input<T> name="lastName" placeholder="Укажите фамилию" />
        </Label>
        <Label caption="Имя" required>
          <Input<T> name="firstName" placeholder="Укажите имя" />
        </Label>
        <Label caption="Отчество">
          <Input<T> name="middleName" placeholder="Укажите отчество" />
        </Label>
        <Label caption="Дата рождения" className='mb-[12px]'>
          <DateInput<T> name="birthDate" />
        </Label>
        <Label caption="Пол">
          <RadioGroup<T, Reference> name="sex" options={genders} wrapperProps={{ className: 'flex space-x-4' }} />
        </Label>
      </div>
      <Typography as="h3" size="16px" fontWeight="semibold" className="mb-4">
        Дополнительные документы
      </Typography>
      <div className="px-[1.75rem] py-6 bg-white rounded flex flex-col gap-4 mb-6">
        <Label caption="СНИЛС">
          <CheckBoxGroup name='hasNotSnilsNumber' options={[{id: 'has-not-snils', caption: 'У обучающегося нет СНИЛС'}]} />
        </Label>
        {!values.hasNotSnilsNumber?.length && (
          <Label>
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
        <Label caption="ИНН">
          <CheckBoxGroup name='hasNotInnNumber' options={[{id: 'has-not-inn', caption: 'У обучающегося нет ИНН'}]} />
        </Label>
        {!values.hasNotInnNumber?.length && (
          <Label>
            <Input<T> name="innNumber" placeholder="XXXXXXXXXXXX" />
          </Label>
        )}
      </div>
      <Typography as="h3" size="16px" fontWeight="semibold" className="mb-4">
        Данные обучающегося
      </Typography>
      <div className="px-[1.75rem] py-6 bg-white rounded flex flex-col gap-4 mb-6">
        <Label caption="Источник финансирования" required>
          <ComboBox<T>
            name="financingSource"
            placeholder="Выберите источник финансирования "
            items={financingSources}
            fullWidth
            // @ts-ignore
            matchWidth
          />
        </Label>
        <Label caption="Личный номер">
          <Input<T> name="personalNumber" placeholder="Укажите личный номер" />
        </Label>
        <Label caption="Номер зачетной книжки">
          <Input<T> name="bookNumber" placeholder="Укажите номер зачётной книжки" />
        </Label>
        <Label caption="Курс обучения">
          <ComboBox<T>
            name="course"
            placeholder="Укажите курс обучения"
            items={courses}
            fullWidth
            // @ts-ignore
            matchWidth
          />
        </Label>
        <Label caption="Учебная группа">
          <ComboBox<T>
            name="group"
            placeholder="Укажите учебную группу "
            items={groups}
            fullWidth
            // @ts-ignore
            matchWidth
            disabled={disabledFields?.group}
          />
        </Label>
      </div>
      <div className="px-[1.75rem] py-6 bg-white rounded mb-6 flex items-center gap-4">
        <Icon className="text-[#21BA72]" iconName="master-warning" />
        <Typography size="14px">Обучающийся получит письмо с уведомлением на указанную эл.почту</Typography>
      </div>
      <FormButtonGroup contentWrapperClassName="px-9" submitIsDisabled={!dirty} onReset={onReset} />
    </>
  );
};
