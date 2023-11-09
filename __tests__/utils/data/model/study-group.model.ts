import { DataGenerator } from '../generator.data';

interface StudyGroup {
  groupType?: { code: string; name: string };
  title?: string;
}

export class StudyGroupModel {
  groupType: { code: string; name: string };

  title: string;

  constructor(studyGroup: StudyGroup = {}) {
    const generator = new DataGenerator();

    this.groupType = studyGroup.groupType ?? { name: 'Академическая группа', code: 'academic' };
    this.title = studyGroup.title ?? generator.numberStr(4);
  }
}
