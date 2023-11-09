import { Page } from '@playwright/test';

import { Button } from '../locators/button';
import { Input } from '../locators/input';
import { Switch } from '../locators/switch';
import { Block } from '../locators/block';
import { Modal } from '../page-elements/modal/modal';

import { UIKitLocators } from './common/UIKitLocators';
import { BasePage } from './common/base-page';

export class EduPlanDescPage extends BasePage {
  uiKit: UIKitLocators;

  baseURL: string;

  modal: Modal;

  constructor(page: Page, baseURL: string) {
    super(page);
    this.baseURL = baseURL;
    this.uiKit = new UIKitLocators(page);
    this.modal = new Modal(page);
  }

  get setUpButton(): Button {
    return new Button(this.page.locator('span:has-text("Настроить")'), 'Настроить');
  }

  get alertAddingDescBlock(): Block {
    return new Block(
      this.page.locator('[role="alert"] >> :text("Данные витрины успешно обновлены")'),
      'Данные витрины успешно обновлены',
    );
  }

  get backToPlanCardButton(): Button {
    return new Button(this.page.getByText('К карточке плана обучения'), 'К карточке плана обучения');
  }

  get b2cDescriptionField(): Input {
    return new Input(this.page.locator(`[name="b2c.description"]`), `B2C описание`);
  }

  get b2cTargetField(): Input {
    return new Input(this.page.locator(`[name="b2c.target"]`), `B2C целевая аудитория`);
  }

  get b2cResultField(): Input {
    return new Input(this.page.locator(`[name="b2c.result"]`), `B2C Результат обучения`);
  }

  get b2cLandingField(): Input {
    return new Input(this.page.locator(`[name="b2c.landing"]`), `B2C Лендинг`);
  }

  get b2cUrlField(): Input {
    return new Input(this.page.locator(`[name="b2c.url"]`), `B2C Адрес сайта`);
  }

  get b2cPriceField(): Input {
    return new Input(this.page.locator(`[name="b2c.price"]`), `B2C Стоимость`);
  }

  get b2cPriorityField(): Input {
    return new Input(this.page.locator(`[name="b2c.priority"]`), `B2C Приоритет`);
  }

  get b2cIsPublSwitch(): Switch {
    return new Switch(this.page.locator('[for="b2c.isPubl"]'), 'B2C Опубликовать');
  }

  get b2bDescriptionField(): Input {
    return new Input(this.page.locator(`[name="b2b.description"]`), `B2B описание`);
  }

  get b2bTargetField(): Input {
    return new Input(this.page.locator(`[name="b2b.target"]`), `B2B целевая аудитория`);
  }

  get b2bResultField(): Input {
    return new Input(this.page.locator(`[name="b2b.result"]`), `B2B Результат обучения`);
  }

  get b2bLandingField(): Input {
    return new Input(this.page.locator(`[name="b2b.landing"]`), `B2B Лендинг`);
  }

  get b2bPriceField(): Input {
    return new Input(this.page.locator(`[name="b2b.price"]`), `B2B Стоимость`);
  }

  get b2bPriorityField(): Input {
    return new Input(this.page.locator(`[name="b2b.priority"]`), `B2B Приоритет`);
  }

  get b2bIsPublSwitch(): Switch {
    return new Switch(this.page.locator(`[for="b2b.isPubl"]`), `B2B Опубликовать`);
  }

  get descriptionNotSpecifiedHeaderStub(): Block {
    return new Block(
      this.page.locator('h1', { hasText: 'Описания для витрин образовательных программ не указаны' }),
      'Заглушка «Описания для витрин образовательных программ не указаны»',
    );
  }

  get descriptionNotSpecifiedTextStub(): Block {
    return new Block(
      this.page.locator('p', { hasText: 'Для ввода данных нажмите на кнопку «Настроить»' }),
      'Заглушка «Для ввода данных нажмите на кнопку «Настроить»»',
    );
  }

  get viewDescBlock(): Block {
    return new Block(this.page.locator('[data-testid="viewDesc"]'), 'Форма просмотра витрины');
  }

  get settingDescBlock(): Block {
    return new Block(this.page.locator('[data-testid="settingDesc"]'), 'Форма настройки витрины');
  }

  get questionB2cBlock(): Block {
    return new Block(
      this.page.locator(
        '[data-testid="groupTitle"]:has-text("Описание для витрины B2C") >> [data-icon-name="master-question"]',
      ),
      '(?) «Подсказка для витрины B2C»',
    );
  }

  get questionB2bBlock(): Block {
    return new Block(
      this.page.locator(
        '[data-testid="groupTitle"]:has-text("Описание для витрины B2B") >> [data-icon-name="master-question"]',
      ),
      '(?) «Подсказка для витрины B2B»',
    );
  }

  async openEduPlanDesc(): Promise<void> {
    await this.page.goto(`${this.baseURL}/eduplan/plan/epl_2Kb1TimnZGbvHcZCy3AiqX1z7og/desc`);
  }
}
