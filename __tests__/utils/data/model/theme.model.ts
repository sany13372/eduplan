import { DataGenerator } from '../generator.data';

interface Theme {
  title?: string;
}

export class ThemeModel {
  title: string;

  constructor(theme: Theme = {}) {
    const generator = new DataGenerator();

    this.title = theme.title ?? generator.companyName();
  }
}
