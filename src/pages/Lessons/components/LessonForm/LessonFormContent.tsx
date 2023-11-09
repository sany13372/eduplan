/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, useFormikContext } from 'formik';
import { ComboBox, FormButtonGroup, Input } from '@sber-universe/om-component-library';
import { EduKind, LessonItemShort } from '@src/pages/Lessons/model/types';
import { Typography } from '@kit-edu/typography';

export type LessonFormContentProps = {
  eduKinds: EduKind[];
  onReset: () => void;
  eduKindsIsAvailable: boolean;
  isSubmitted: boolean;
  mode: 'new' | 'edit';
};
export const LessonFormContent = <T extends LessonItemShort>({
  eduKinds,
  onReset,
  mode,
}: LessonFormContentProps): JSX.Element => {
  const { dirty } = useFormikContext();
  return (
    <Form className="flex flex-col h-full">
      <div className="space-y-6 flex flex-col px-9">
        <label htmlFor="title" className="flex flex-col">
          <Typography size="12px" className="text-base-500 mb-2">
            Название
          </Typography>
          <Input<T> name="title" placeholder="Введите название занятия" />
        </label>

        <label htmlFor="eduKind" className="flex flex-col">
          <Typography size="12px" className="text-base-500 mb-2">
            Вид занятия
          </Typography>
          <ComboBox<T>
            name="eduKind"
            placeholder="Выберите вид занятия"
            className="w-full"
            items={eduKinds}
            fullWidth
            disabled={mode === 'edit'}
            // @ts-ignore
            matchWidth
          />
        </label>
      </div>

      <div className="mt-auto bg-white px-9 py-5">
        <FormButtonGroup submitDisabled={!dirty} onResetClick={onReset} />
      </div>
    </Form>
  );
};
