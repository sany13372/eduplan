import { Form, useFormikContext } from 'formik';
import { useStore } from 'effector-react';
import {
  dateMask,
  Input,
  Label,
  timeMask,
  Textarea,
  MaskInput,
  ComboBox,
  useMediaQuery,
} from '@sber-universe/om-component-library';
import { SetEventInfo } from '@src/pages/Events/model/types';
import isEqual from 'lodash/isEqual';
import { isMixed, isOffline, isOnline, isOnlineWithLink } from '@src/pages/Events/model/utils';
import { ReferencesForm } from '@src/pages/Events/components/SetEventInfo/ReferencesForm';
import { ReferencesInfo } from '@src/pages/Events/components/SetEventInfo/ReferencesInfo';
import { FormButtonGroup } from '@src/components';
import { eventVideoConfKindsStore } from '@src/pages/Events/model';

import { SetEventInfoFormContentProps } from './types';

function getOptionalFieldsVisibility({ format, videoConfKind }: SetEventInfo) {
  const isFormatWithLink = format && (isMixed(format) || isOnline(format));
  const isFormatWithPlace = format && (isMixed(format) || isOffline(format));
  const isVideoConfKindWithlink = videoConfKind && isOnlineWithLink(videoConfKind);
  return {
    videoConfKind: isFormatWithLink,
    link: isFormatWithLink && isVideoConfKindWithlink,
    place: isFormatWithPlace,
  };
}

export const SetEventInfoFormContent = ({ isCreateItemForm, isLoading, onReset }: SetEventInfoFormContentProps) => {
  const { values, initialValues } = useFormikContext<SetEventInfo>();
  const eventVideoConfKindList = useStore(eventVideoConfKindsStore.$value);
  const { format, kind, id } = values;
  const valuesChanged = !isEqual(initialValues, values);
  const optionalFieldsVisibility = getOptionalFieldsVisibility(values);
  const isMobile = useMediaQuery({ breakpoint: 'md', type: 'down' });

  return (
    <Form className="space-y-[50px]">
      {!isCreateItemForm && <ReferencesInfo formatLabel={format?.caption} kindLabel={kind?.caption} />}
      <div className="space-y-4 ">
        {isCreateItemForm && <ReferencesForm />}
        <Label caption="Название">
          <Input<SetEventInfo> name="title" placeholder="Напишите название события" />
        </Label>
        {isCreateItemForm && optionalFieldsVisibility.videoConfKind && (
          <Label caption="Сервис">
            <ComboBox<SetEventInfo>
              name="videoConfKind"
              placeholder="Выберите онлайн-сервис для проведения события"
              fullWidth
              // @ts-ignore
              matchWidth
              items={eventVideoConfKindList}
            />
          </Label>
        )}
        {optionalFieldsVisibility.place && (
          <Label caption="Место проведения">
            <Input<SetEventInfo> name="place" placeholder="Напишите адрес события" />
          </Label>
        )}
        {optionalFieldsVisibility.link && (
          <Label caption="Ссылка">
            <Input<SetEventInfo> name="link" placeholder="https://" />
          </Label>
        )}

        <Label caption="Описание" optional captionClassName="pt-4  self-start">
          <Textarea<SetEventInfo>
            name="description"
            placeholder="Укажите дополнительную информацию, которую следует знать участникам события"
            resize="none"
          />
        </Label>
        <Label caption="Дата">
          <MaskInput<SetEventInfo> name="date" iconName="master-calendar" maskProps={dateMask} className="md:w-2/3" />
        </Label>
        {!isMobile && (
          <Label caption="Время">
            <div className="w-2/3 flex items-start space-x-3">
              <MaskInput<SetEventInfo> name="startTime" className="" maskProps={timeMask} iconName="master-clock" />
              <span style={{ lineHeight: '48px' }}>-</span>
              <MaskInput<SetEventInfo> name="endTime" className="" maskProps={timeMask} iconName="master-clock" />
            </div>
          </Label>
        )}
        {isMobile && (
          <>
            <Label caption="Время начала">
              <MaskInput<SetEventInfo> name="startTime" className="" maskProps={timeMask} iconName="master-clock" />
            </Label>
            <Label caption="Время окончания">
              <MaskInput<SetEventInfo> name="endTime" className="" maskProps={timeMask} iconName="master-clock" />
            </Label>
          </>
        )}
      </div>
      <FormButtonGroup
        onReset={onReset}
        isLoading={isLoading}
        submitLabel={id ? 'Сохранить' : 'Далее'}
        submitIsDisabled={!valuesChanged}
      />
    </Form>
  );
};
