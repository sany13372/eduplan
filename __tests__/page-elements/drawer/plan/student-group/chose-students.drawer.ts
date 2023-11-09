import { Page } from '@playwright/test';

import { CommonDrawer } from '../../common.drawer';
import { Switch } from '../../../../locators/switch';
import { Block } from '../../../../locators/block';

export class ChoseStudentsDrawer extends CommonDrawer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(page: Page) {
    super(page);
  }

  studentCardBlock(fullName: string): Block {
    return new Block(
      this.drawer.locator(`[data-testid="studentCard"]:has-text("${fullName}")`),
      `Блок обучающегося «${fullName}»`,
    );
  }

  studentInfoBlock(fullName: string, text: string): Block {
    return new Block(
      this.studentCardBlock(fullName).getLocator.locator(`:text("${text}")`),
      `Студент «${fullName}» имеет «${text}»`,
    );
  }

  chooseStudentSwitch(fullName: string): Switch {
    return new Switch(
      this.studentCardBlock(fullName).getLocator.locator(`[data-testid="checkedStudents"]`),
      `Выбрать студента «${fullName}»`,
    );
  }
}
