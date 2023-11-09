/* eslint-disable no-await-in-loop */
import { expect } from '@playwright/test';

import { test } from '../fixtures/academy.fixtures';
import { DescModel } from '../utils/data/model/desc.model';
import { DescAnswer } from '../utils/data/enum/desc.answer.enum';
import { DESC_VALIDATION_DATA } from '../utils/data/validation/desc.validation';

let desc: DescModel;
const form = {
  view: 'Данные для витрины образовательных программ',
  setting: 'Настройка данных для витрины образовательных программ',
};
const field = {
  description: 'Описание',
  target: 'Целевая аудитория',
  result: 'Результаты обучения',
  url: 'Адрес сайта',
  landing: 'Лендинг',
  price: 'Стоимость',
};

test.describe('|Планы обучения| Витрина', () => {
  test.beforeEach(async () => {
    desc = new DescModel({});
  });

  test('#SBO-T5774 Вид вкладки без добавленного описания витрины', async ({ descPage, descApiMock }) => {
    await descApiMock.mockSettingDesc(DescAnswer.WITHOUT_SITTINGS, desc);

    await descPage.openEduPlanDesc();
    await expect.soft(descPage.uiKit.headerH3Block(form.view).getLocator).toBeVisible();
    await expect.soft(descPage.setUpButton.getLocator).toBeVisible();
    await expect.soft(descPage.descriptionNotSpecifiedHeaderStub.getLocator).toBeVisible();
    await expect.soft(descPage.descriptionNotSpecifiedTextStub.getLocator).toBeVisible();
  });

  test('#SBO-T5779 Настроить и опубликовать витрину B2C', async ({ descPage, descApiMock }) => {
    desc = new DescModel({ b2cIsPublic: false });
    await descApiMock.mockSettingDesc(DescAnswer.WITHOUT_SITTINGS, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await descPage.b2cDescriptionField.fill(desc.b2cDescription);
    await descPage.b2cTargetField.fill(desc.b2cTarget);
    await descPage.b2cResultField.fill(desc.b2cResult);
    await descPage.b2cUrlField.fill(desc.b2cUrl);
    await descPage.b2cLandingField.fill(desc.b2cLandingUrl);
    await descPage.b2cPriceField.fill(desc.b2cPrice);
    await descPage.b2cPriorityField.fill(desc.b2cPriority.toString());
    await descPage.b2cIsPublSwitch.click(true);
    await descPage.uiKit.saveButton.click();

    await expect(descPage.uiKit.headerH3Block(form.view).getLocator).toBeVisible();
    await expect(descPage.alertAddingDescBlock.getLocator).toBeVisible();
  });

  test('#SBO-T5780 Настроить и опубликовать витрину B2B', async ({ descPage, descApiMock }) => {
    desc = new DescModel({ b2bIsPublic: false });
    await descApiMock.mockSettingDesc(DescAnswer.WITHOUT_SITTINGS, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await descPage.b2bDescriptionField.fill(desc.b2bDescription);
    await descPage.b2bTargetField.fill(desc.b2bTarget);
    await descPage.b2bResultField.fill(desc.b2bResult);
    await descPage.b2bLandingField.fill(desc.b2bLandingUrl);
    await descPage.b2bPriceField.fill(desc.b2bPrice);
    await descPage.b2bPriorityField.fill(desc.b2bPriority.toString());
    await descPage.b2bIsPublSwitch.click(true);
    await descPage.uiKit.saveButton.click();

    await expect(descPage.uiKit.headerH3Block(form.view).getLocator).toBeVisible();
    await expect(descPage.alertAddingDescBlock.getLocator).toBeVisible();
  });

  test('#SBO-T5786 Редактировать и не опубликовывать витрину B2C', async ({ descPage, descApiMock, generator }) => {
    desc = new DescModel({
      b2cDescription: 'Data Science — стремительно развивающаяся отрасль на стыке бизнеса и интернет-технологий.',
      b2cTarget: 'Выпускники бакалавриата по ИТ направлениям.',
      b2cResult: 'Студенты проходят практики и стажировки на ведущих отечественных и зарубежных предприятиях.',
      b2cUrl: 'https://misis.ru/',
      b2cLandingUrl: 'https://academy.edutoria.ru/2023-mag/misis-data-science/',
      b2cPrice: '40 000 руб/год',
      b2cPriority: '44',
      b2cIsPublic: false,
    });
    await descApiMock.mockSettingDesc(DescAnswer.B2C, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await descPage.b2cDescriptionField.fill(generator.paragraph());
    await descPage.b2cTargetField.fill(generator.paragraph());
    await descPage.b2cResultField.fill(generator.paragraph());
    await descPage.b2cUrlField.fill(generator.url());
    await descPage.b2cLandingField.fill(generator.url());
    await descPage.b2cPriceField.fill(generator.numberStr(7));
    await descPage.b2cPriorityField.fillHighlighted(generator.numberStr(5));
    await descPage.uiKit.saveButton.click();

    await expect(descPage.alertAddingDescBlock.getLocator).toBeVisible();
    await descPage.setViewportBlockSize();
    await expect(descPage.viewDescBlock.getLocator).toHaveScreenshot([`viewB2cDesc.png`]);
  });

  test('#SBO-T5785 Редактировать и не опубликовывать витрину B2B', async ({ descPage, descApiMock, generator }) => {
    desc = new DescModel({
      b2bDescription: 'Помимо развития профессиональных навыков важно развивать компетенции.',
      b2bTarget: 'Программа подойдет специалистам, руководителям высшего и среднего звена, преподавателям школ.',
      b2bResult: 'Дизайн-мышление – ознакомление с основными методами и принципами дизайн-мышления.',
      b2bLandingUrl: 'https://academy.edutoria.ru/2023-corp/pgups-designer/',
      b2bPrice: '88 400 руб/мес',
      b2bPriority: '16',
      b2bIsPublic: false,
    });
    await descApiMock.mockSettingDesc(DescAnswer.B2B, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await descPage.b2bDescriptionField.fill(generator.paragraph());
    await descPage.b2bTargetField.fill(generator.paragraph());
    await descPage.b2bResultField.fill(generator.paragraph());
    await descPage.b2bLandingField.fill(generator.url());
    await descPage.b2bPriceField.fill(generator.numberStr(7));
    await descPage.b2bPriorityField.fillHighlighted(generator.numberStr(7));
    await descPage.uiKit.saveButton.click();

    await expect(descPage.alertAddingDescBlock.getLocator).toBeVisible();
    await descPage.setViewportBlockSize();
    await expect(descPage.viewDescBlock.getLocator).toHaveScreenshot([`viewB2bDesc.png`]);
  });

  test('#SBO-T6906 Редактировать и опубликовывать обе витрины', async ({ descPage, descApiMock, generator }) => {
    desc = new DescModel({
      b2cDescription: 'Data Science — стремительно развивающаяся отрасль на стыке бизнеса и интернет-технологий.',
      b2cTarget: 'Выпускники бакалавриата по ИТ направлениям.',
      b2cResult: 'Студенты проходят практики и стажировки на ведущих отечественных и зарубежных предприятиях.',
      b2cUrl: 'https://misis.ru/',
      b2cLandingUrl: 'https://academy.edutoria.ru/2023-mag/misis-data-science/',
      b2cPrice: '40 000 руб/год',
      b2cPriority: '44',
      b2cIsPublic: true,
      b2bDescription: 'Помимо развития профессиональных навыков важно развивать компетенции.',
      b2bTarget: 'Программа подойдет специалистам, руководителям высшего и среднего звена, преподавателям школ.',
      b2bResult: 'Дизайн-мышление – ознакомление с основными методами и принципами дизайн-мышления.',
      b2bLandingUrl: 'https://academy.edutoria.ru/2023-corp/pgups-designer/',
      b2bPrice: '88 400 руб/мес',
      b2bPriority: '16',
      b2bIsPublic: true,
    });
    await descApiMock.mockSettingDesc(DescAnswer.BOTH, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await descPage.b2cDescriptionField.fill(generator.paragraph());
    await descPage.b2cTargetField.fill(generator.paragraph());
    await descPage.b2cResultField.fill(generator.paragraph());
    await descPage.b2cUrlField.fill(generator.url());
    await descPage.b2cLandingField.fill(generator.url());
    await descPage.b2cPriceField.fill(generator.numberStr(7));
    await descPage.b2cPriorityField.fillHighlighted(generator.numberStr(5));
    await descPage.b2bDescriptionField.fill(generator.paragraph());
    await descPage.b2bTargetField.fill(generator.paragraph());
    await descPage.b2bResultField.fill(generator.paragraph());
    await descPage.b2bLandingField.fill(generator.url());
    await descPage.b2bPriceField.fill(generator.numberStr(7));
    await descPage.b2bPriorityField.fillHighlighted(generator.numberStr(7));
    await descPage.uiKit.saveButton.click();

    await expect(descPage.alertAddingDescBlock.getLocator).toBeVisible();
    await descPage.setViewportBlockSize();
    await expect(descPage.viewDescBlock.getLocator).toHaveScreenshot([`viewBothDesc.png`]);
  });

  test('#SBO-T5790 Подсказки', async ({ descPage, descApiMock }) => {
    const b2cQuestion =
      'Данные будут использованы для карточки программы в каталоге высшего образования или дополнительного профессионального образования (в зависимости от вида образовательной программы)';
    const b2bQuestion = 'Данные будут использованы для карточки программы в каталоге корпоративного обучения';
    await descApiMock.mockSettingDesc(DescAnswer.BOTH, desc);

    await descPage.openEduPlanDesc();
    await expect(descPage.uiKit.headerH3Block(form.view).getLocator).toBeVisible();
    await descPage.questionB2cBlock.hover();
    await expect(descPage.uiKit.textLabel(b2cQuestion).getLocator).toBeVisible();
    await descPage.questionB2bBlock.hover();
    await expect(descPage.uiKit.textLabel(b2bQuestion).getLocator).toBeVisible();

    await descPage.setUpButton.click();
    await expect(descPage.uiKit.headerH3Block(form.setting).getLocator).toBeVisible();
    await descPage.questionB2cBlock.hover();
    await expect(descPage.uiKit.textLabel(b2cQuestion).getLocator).toBeVisible();
    await descPage.questionB2bBlock.hover();
    await expect(descPage.uiKit.textLabel(b2bQuestion).getLocator).toBeVisible();
  });

  test('#SBO-T5787 Навигация в форме настроек', async ({ descPage, descApiMock }) => {
    await descApiMock.mockSettingDesc(DescAnswer.BOTH, new DescModel({}));

    await descPage.openEduPlanDesc();
    for (const label of [descPage.uiKit.cancelButton.getName, descPage.backToPlanCardButton.getName]) {
      await descPage.setUpButton.click();
      await descPage.uiKit.textLabel(label).click();
      await expect(descPage.setUpButton.getLocator).toBeVisible();

      await descPage.setUpButton.click();
      await descPage.b2cDescriptionField.fill(desc.b2cDescription);
      await descPage.uiKit.textLabel(label).click();
      await descPage.modal.stayButton.click();
      await expect(descPage.modal.block.getLocator).toBeHidden();

      await descPage.b2bDescriptionField.fill(desc.b2bDescription);
      await descPage.uiKit.textLabel(label).click();
      await descPage.modal.closeButton.click();
      await expect(descPage.modal.block.getLocator).toBeHidden();

      await descPage.uiKit.textLabel(label).click();
      await descPage.modal.exitButton.click();
      await expect(descPage.setUpButton.getLocator).toBeVisible();
    }
  });

  test('#SBO-T5789 Настройка витрины, не заполнять все поля для B2B и B2C', async ({ descPage, descApiMock }) => {
    desc = new DescModel({ b2cIsPublic: false, b2bIsPublic: false });
    await descApiMock.mockSettingDesc(DescAnswer.ONLY_REQUIRED, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await descPage.uiKit.saveButton.click();

    await expect(descPage.alertAddingDescBlock.getLocator).toBeVisible();
    await expect(descPage.viewDescBlock.getLocator).toHaveScreenshot([`viewOnlyRequiredDesc.png`]);
  });

  DESC_VALIDATION_DATA.forEach((obj) => {
    test(`#SBO-T5792 Валидация полей «${obj.name}»`, async ({ descPage, descApiMock }) => {
      await descApiMock.mockSettingDesc(DescAnswer.WITHOUT_SITTINGS, desc);

      await descPage.openEduPlanDesc();
      await descPage.setUpButton.click();
      await descPage.b2cDescriptionField.fill(obj.b2cDescription.value);
      await descPage.b2cTargetField.fill(obj.b2cTarget.value);
      await descPage.b2cResultField.fill(obj.b2cResult.value);
      await descPage.b2cUrlField.fill(obj.b2cUrl.value);
      await descPage.b2cLandingField.fill(obj.b2cLanding.value);
      await descPage.b2cPriceField.fill(obj.b2cPrice.value);
      await descPage.b2bDescriptionField.fill(obj.b2bDescription.value);
      await descPage.b2bTargetField.fill(obj.b2bTarget.value);
      await descPage.b2bResultField.fill(obj.b2bResult.value);
      await descPage.b2bLandingField.fill(obj.b2bLanding.value);
      await descPage.b2bPriceField.fill(obj.b2bPrice.value);
      await descPage.uiKit.saveButton.click();
      if (obj.b2cDescription.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.description, obj.b2cDescription.message).getLocator).toBeVisible();
      }
      if (obj.b2cTarget.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.target, obj.b2cTarget.message).getLocator).toBeVisible();
      }
      if (obj.b2cResult.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.result, obj.b2cResult.message).getLocator).toBeVisible();
      }
      if (obj.b2cUrl.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.url, obj.b2cUrl.message).getLocator).toBeVisible();
      }
      if (obj.b2cLanding.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.landing, obj.b2cLanding.message).getLocator).toBeVisible();
      }
      if (obj.b2cPrice.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.price, obj.b2cPrice.message).getLocator).toBeVisible();
      }
      if (obj.b2bDescription.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.description, obj.b2bDescription.message).getLocator).toBeVisible();
      }
      if (obj.b2bTarget.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.target, obj.b2bTarget.message).getLocator).toBeVisible();
      }
      if (obj.b2bResult.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.result, obj.b2bResult.message).getLocator).toBeVisible();
      }
      if (obj.b2bLanding.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.landing, obj.b2bLanding.message).getLocator).toBeVisible();
      }
      if (obj.b2bPrice.message !== null) {
        await expect(descPage.uiKit.fieldBlock(field.price, obj.b2bPrice.message).getLocator).toBeVisible();
      }
      if (obj.name === 'Граничные значения') {
        await expect(descPage.setUpButton.getLocator).toBeVisible();
      }
    });
  });

  test('#SBO-T6911 Функциональность формы настроек', async ({ descPage, descApiMock }) => {
    await descApiMock.mockSettingDesc(DescAnswer.WITHOUT_SITTINGS, desc);

    await descPage.openEduPlanDesc();
    await descPage.setUpButton.click();
    await expect(descPage.uiKit.headerH3Block(form.setting).getLocator).toBeVisible();
    await descPage.setViewportBlockSize();
    await expect(descPage.settingDescBlock.getLocator).toHaveScreenshot([`settingDesc.png`]);
  });
});
