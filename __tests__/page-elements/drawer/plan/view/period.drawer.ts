import { Page } from '@playwright/test';

import { CommonDrawer } from '../../common.drawer';
import { Input } from '../../../../locators/input';
import { Select } from '../../../../locators/select';
import { Block } from '../../../../locators/block';
import { MoreActions } from '../../../../locators/more-actions';

export class PeriodDrawer extends CommonDrawer {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(page: Page) {
    super(page);
  }

  get showTypeSelect(): Select {
    return new Select(this.drawer.locator('[data-testid="periodKind-container"]'), 'Вид занятия');
  }

  get startDateField(): Input {
    return new Input(this.drawer.locator('[data-testid="dates.start.Dropable.OpenNode"] >> input'), 'Дата начала');
  }

  get endDateField(): Input {
    return new Input(this.drawer.locator('[data-testid="dates.end.Dropable.OpenNode"] >> input'), 'Дата окончания');
  }

  periodBlock(title: string): Block {
    return new Block(this.drawer.locator(`[data-testid="periodBlock"]:has-text("${title}")`), `Период «${title}»`);
  }

  periodKindBlock(title: string, kind: string): Block {
    return new Block(
      this.periodBlock(title).getLocator.locator(`[data-testid="periodKind"]:has-text("${kind}")`),
      `Период «${title}» имеет вид «${kind}»`,
    );
  }

  periodDateBlock(title: string, date: string): Block {
    return new Block(
      this.periodBlock(title).getLocator.locator(`[data-testid="periodDate"]:has-text("${date}")`),
      `Период «${title}» имеет дату «${date}»`,
    );
  }

  periodAction(title: string): MoreActions {
    return new MoreActions(
      this.periodBlock(title).getLocator.locator('[data-testid="EDUKit.DropdownMenu.OpenNode"]'),
      'Редактировать период',
    );
  }

  infoPanelBlock(text: string): Block {
    return new Block(
      this.drawer.locator(`[data-testid="infoPanel"] >> :text("${text}")`).last(),
      `Текст «${text}» в информационной панели выпадающего окна`,
    );
  }
}
