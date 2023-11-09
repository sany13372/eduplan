import { Card } from '@src/components';
import { Typography } from '@kit-edu/typography';
import { LinkButton } from '@kit-edu/button';
import React from 'react';

export const CardImportInformation = () => {
  return (
    <Card className="p-8 mb-6">
      <Typography as="h4" size="18px" fontWeight="semibold">
        Подготовка файла для импорта
      </Typography>
      <Typography as="p" size="14px" className="mb-6 mt-4">
        В систему можно загрузить только таблицу в формате CSV. Скачайте шаблон таблицы и заполните его
      </Typography>
      <div className="flex gap-4">
        <LinkButton
          appearance="black"
          size="medium"
          target="_blank"
          to="https://obs.ru-moscow-1.hc.sbercloud.ru/academy-public-prod/AcademyDocuments/man/student_import_template.csv"
        >
          Скачать шаблон
        </LinkButton>
        <LinkButton
          appearance="black"
          size="medium"
          target="_blank"
          to="https://obs.ru-moscow-1.hc.sbercloud.ru/academy-public-prod/AcademyDocuments/man/student_import.pdf"
        >
          Скачать инструкцию
        </LinkButton>
      </div>
    </Card>
  );
};
