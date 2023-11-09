import { Page } from '@playwright/test';

import { CommonDrawer } from '../../common.drawer';
import { Input } from '../../../../locators/input';
import { Select } from '../../../../locators/select';
import { Switch } from '../../../../locators/switch';
import { Button } from '../../../../locators/button';

export class StudentDrawer extends CommonDrawer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(page: Page) {
    super(page);
  }

  get lastNameField(): Input {
    return new Input(this.drawer.locator('#lastName'), 'Фамилия');
  }

  get firstNameField(): Input {
    return new Input(this.drawer.locator('#firstName'), 'Имя');
  }

  get middleNameField(): Input {
    return new Input(this.drawer.locator('#middleName'), 'Отчество');
  }

  get snilsField(): Input {
    return new Input(this.drawer.locator('#snilsNumber'), 'СНИЛС');
  }

  get innField(): Input {
    return new Input(this.drawer.locator('#innNumber'), 'ИНН');
  }

  get personalField(): Input {
    return new Input(this.drawer.locator('#personalNumber'), 'Личный номер');
  }

  get emailField(): Input {
    return new Input(this.drawer.locator('#email'), 'Электронная почта пользователя');
  }

  get hasNotSnilsNumberSwitch(): Switch {
    return new Switch(this.drawer.locator('[for="has-not-snils"]'), 'У обучающегося нет СНИЛС');
  }

  get hasNotInnNumberSwitch(): Switch {
    return new Switch(this.drawer.locator('[for="has-not-inn"]'), 'У обучающегося нет ИНН');
  }

  get birthDateField(): Input {
    return new Input(this.drawer.locator('[data-testid="birthDate.Dropable.OpenNode"] >> input'), 'Дата рождения');
  }

  get studyGroupSelect(): Select {
    return new Select(this.drawer.locator('[data-testid="group-container"]'), 'Учебная группа');
  }

  get bookNumberField(): Input {
    return new Input(this.drawer.locator('#bookNumber'), 'Номер зачетной книжки');
  }

  get studyCourseSelect(): Select {
    return new Select(this.drawer.locator('[data-testid="course-container"]'), 'Курс обучения');
  }

  get financialSourceSelect(): Select {
    return new Select(this.drawer.locator('[data-testid="financingSource-container"]'), 'Источник финансирования');
  }

  sexRadioButton(sex: string): Button {
    return new Button(this.drawer.locator(`[data-testid="sex-container"] >> :text("${sex}")`), `Пол: ${sex}`);
  }
}
