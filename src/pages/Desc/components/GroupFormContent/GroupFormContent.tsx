import { EduPlanDesc } from '@src/pages/Desc/model/types';
import { Input, Label, Textarea, Switch, MaskInput } from '@sber-universe/om-component-library';
import React from 'react';
import IMask from 'imask/esm/imask';
import 'imask/esm/masked/number';

class NullableMaskedNumber extends IMask.MaskedNumber {
  // @ts-ignore
  get typedValue() {
    return this.unmaskedValue !== ''
      ? // @ts-ignore
        super.typedValue
      : null;
  }

  // @ts-ignore
  set typedValue(num) {
    // @ts-ignore
    super.typedValue = num;
  }
}

type GroupFormContentProps = {
  prefix: keyof Omit<EduPlanDesc, 'id'>;
  withUrl?: boolean;
};
const textAreaClasslist = 'max-w-full min-w-full';
export const GroupFormContent = ({ prefix, withUrl }: GroupFormContentProps) => {
  return (
    <div className="space-y-4">
      <Label caption="Описание" captionClassName="pt-4  self-start">
        <Textarea
          name={`${prefix}.description`}
          placeholder="Напишите, о чём данная программа"
          className={textAreaClasslist}
          resize="none"
        />
      </Label>
      <Label caption="Целевая аудитория" captionClassName="pt-4  self-start">
        <Textarea
          name={`${prefix}.target`}
          placeholder="Напишите, для кого предназначена данная программа"
          className={textAreaClasslist}
          resize="none"
        />
      </Label>
      <Label caption="Результаты обучения" captionClassName="pt-4  self-start">
        <Textarea
          name={`${prefix}.result`}
          placeholder="Напишите, какие знания, умения или навыки приобретёт обучающийся по окончании данной программы"
          className={textAreaClasslist}
          resize="none"
        />
      </Label>
      {withUrl && (
        <Label caption="Адрес сайта">
          <div className="w-2/3">
            <Input name={`${prefix}.url`} placeholder="https://" />
          </div>
        </Label>
      )}
      <Label caption="Лендинг">
        <div className="w-2/3">
          <Input name={`${prefix}.landing`} placeholder="https://" />
        </div>
      </Label>
      <Label caption="Стоимость">
        <div className="w-1/2">
          <Input name={`${prefix}.price`} placeholder="Укажите стоимость" />
        </div>
      </Label>
      <Label caption="Приоритет">
        <div className="w-1/2">
          <MaskInput
            name={`${prefix}.priority`}
            placeholder="Укажите приоритет"
            maskProps={
              new NullableMaskedNumber({
                mask: Number,
                padFractionalZeros: true,
                scale: 0,
                min: 0,
                max: 99999,
              })
            }
          />
        </div>
      </Label>
      <Label caption="Опубликовать">
        <Switch name={`${prefix}.isPubl`} />
      </Label>
    </div>
  );
};
