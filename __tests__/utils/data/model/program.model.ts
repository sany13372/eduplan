import { DataGenerator } from '../generator.data';

interface Program {
  eduLevel?: { code: string; title: string };
  eduProgramKind?: { code: string; title: string; shortTitle: string };
  domainOfStudy?: { code: string; title: string };
  title?: string;
  shortTitle?: string;
}

export class ProgramModel {
  eduLevel: { code: string; title: string };

  eduProgramKind: { code: string; title: string; shortTitle: string };

  domainOfStudy: { code: string; title: string };

  title: string;

  shortTitle: string;

  constructor(program: Program = {}) {
    const generator = new DataGenerator();

    this.eduLevel = program.eduLevel ?? {
      title: 'Высшее образование - специалитет, магистратура',
      code: 'spec-mast',
    };
    this.eduProgramKind = program.eduProgramKind ?? {
      title: 'Программа магистратуры',
      shortTitle: 'Магистратура',
      code: 'master',
    };
    this.domainOfStudy = program.domainOfStudy ?? { title: 'Информатика и вычислительная техника', code: '09.04.01' };
    this.title = program.title ?? generator.jobTitle();
    this.shortTitle = program.shortTitle ?? generator.words(1);
  }
}
