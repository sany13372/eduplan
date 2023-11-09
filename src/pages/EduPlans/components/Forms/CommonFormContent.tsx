import { Form, useFormikContext } from 'formik';
import {
  ComboBox,
  FormButtonGroup,
  Input,
  Label,
  Switch,
  MaskInput,
  dateMask,
  yearMask,
  ErrorDialog,
} from '@sber-universe/om-component-library';
import { AddEduPlanInfo } from '@src/pages/EduPlans/model/types';
import { useStore } from 'effector-react';
import { $academicHourDurationList, $eduFormList, $eduTechnologyList } from '@src/pages/EduPlans/model';
import { CompetitionGroupView } from '@src/pages/EduPlans/components/Forms/CompetitionGroupView';
import { CompetitionGroupUpdate } from '@src/pages/EduPlans/components/Forms/CompetitionGroupUpdate';
import { useEffect } from 'react';
import { addEduKind, proEduKind } from '@src/pages/EduPlans/model/constants';
import { Store, Event } from 'effector';
import { ValidationErrors } from '@utils/validation';
import { EduProgFormContent } from '@src/pages/EduPlans/components/Forms/EduProgFormContent';

export type CommonFormContentProps = {
  onReset: () => void;
  errorStore: Store<ValidationErrors>;
  dismissErrorStore: Event<void>;
};
export const CommonFormContent = <T extends AddEduPlanInfo>({
  dismissErrorStore,
  errorStore,
  onReset,
}: CommonFormContentProps): JSX.Element => {
  const eduFormList = useStore($eduFormList);
  const eduTechnologyList = useStore($eduTechnologyList);
  const academicHourDurationList = useStore($academicHourDurationList);
  const validationErrors = useStore(errorStore);

  const { dirty, values, setStatus } = useFormikContext<T>();
  useEffect(() => {
    setStatus(validationErrors);
  }, [validationErrors, setStatus]);

  return (
    <>
      {validationErrors[''] && (
        <ErrorDialog
          portalId="save_eduplan_error_dialog_portal"
          isOpen={Boolean(validationErrors[''])}
          dialogContent={{
            description: validationErrors[''],
          }}
          onClose={dismissErrorStore}
        />
      )}

      <Form className="space-y-6">
        <EduProgFormContent eduProg={values.eduProgramInfo} />

        <Label caption="Полное название" required>
          <Input<T> name="title" placeholder="Введите полное название" />
        </Label>
        <Label caption="Сокращённое название" required>
          <Input<T> name="shortTitle" placeholder="Введите сокращённое название" />
        </Label>
        <Label caption="Форма обучения" required>
          <ComboBox<T>
            name="eduForm"
            placeholder="Выберите форму обучения"
            items={eduFormList}
            fullWidth
            // @ts-ignore
            matchWidth
          />
        </Label>
        <Label caption="Технология обучения" required>
          <ComboBox<T>
            name="eduTechnology"
            placeholder="Выберите технологию обучения"
            items={eduTechnologyList}
            fullWidth
            // @ts-ignore
            matchWidth
          />
        </Label>

        {!values.id ? <CompetitionGroupUpdate /> : <CompetitionGroupView />}

        <Label caption="Год набора" required={values.eduProgramInfo.eduKindSystemCode === proEduKind}>
          <MaskInput name="enrollmentYear" placeholder="Введите год набора обучающихся" maskProps={yearMask} />
        </Label>

        <Label caption="Дата начала обучения" required={values.eduProgramInfo.eduKindSystemCode === addEduKind}>
          <MaskInput name="eduStartDate" placeholder="Выберите дату начала обучения" maskProps={dateMask} />
        </Label>

        <Label caption="Учет часов в академических часах">
          <Switch<T> name="doAccountHoursInAcademicHours" />
        </Label>
        {values.doAccountHoursInAcademicHours && (
          <div className="pl-8 space-y-6">
            <Label caption="1 ак.ч. =">
              <ComboBox<T>
                name="academicHourDuration"
                placeholder="Выберите продолжительность академического часа"
                items={academicHourDurationList}
                fullWidth
                // @ts-ignore
                matchWidth
              />
            </Label>
            <Label caption="Фиксировать продолжительность учебного занятия">
              <Switch<T> name="doAccountLessonDuration" />
            </Label>
            {values.doAccountLessonDuration && (
              <div className="pl-8 space-y-6">
                <Label caption="1 занятие =">
                  <div className="flex space-x-8 items-center">
                    <MaskInput
                      name="academicHoursInLessonAmount"
                      placeholder=""
                      maskProps={{
                        mask: Number,
                        scale: 0, // digits after point, 0 for integers
                        signed: false, // disallow negative
                        normalizeZeros: false, // appends or removes zeros at ends
                      }}
                    />
                    {/* <InputNumber<T> name="academicHoursInLessonAmount" placeholder="" /> */}
                    <span className="flex-shrink-0">ак. часов</span>
                  </div>
                </Label>
              </div>
            )}

            <Label caption="Учет часов в ЗЕТ">
              <Switch<T> name="doAccountHoursInCreditUnits" />
            </Label>
            {values.doAccountHoursInCreditUnits && (
              <div className="pl-8 space-y-6">
                <Label caption="1 ЗЕТ =">
                  <div className="flex space-x-8 items-center">
                    <MaskInput
                      name="academicHoursInCreditUnitAmount"
                      placeholder=""
                      maskProps={{
                        mask: Number,
                        scale: 0,
                        signed: false,
                        normalizeZeros: false, // appends or removes zeros at ends
                        autofix: false,
                        padFractionalZeros: false,
                      }}
                    />

                    {/* <NumericInput<T> name="academicHoursInCreditUnitAmount" placeholder="" precision={0} /> */}
                    <span className="flex-shrink-0">ак. часов</span>
                  </div>
                </Label>
              </div>
            )}
          </div>
        )}

        <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} />
      </Form>
    </>
  );
};
