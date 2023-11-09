import { EmptyList as InfoPanel } from '@sber-universe/om-component-library';

export const EmptyScormInfo = (): JSX.Element => (
  <div className="space-y-6">
    <InfoPanel content="Для занятия не загружен SCORM пакет." />
    <InfoPanel content="На Платформу могут быть загружены SCORM пакеты версий 1.2 и 2004." />
  </div>
);
