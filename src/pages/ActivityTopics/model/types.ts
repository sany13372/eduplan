export type Reference = {
  id: string;
  caption: string;
};

export type LessonKind = {
  id: string;
  title: string;
  shortTitle: string;
};

export type WorkKind = {
  id: string;
  title: string;
  shortTitle: string;
  lessonKinds: LessonKind[];
};

export type RawEffort = {
  lessonKindId: string;
  minutesAmount: number;
};

export type TopicNodeCommon = {
  id: string;
  activityId: string;
  caption: string;
  shortTitle: string;
  efforts: RawEffort[];
};

export type TopicNodeBranch = TopicNodeCommon & {
  node: 'branch';
  nodes: TopicNode[];
  componentKind: Reference;
};

export type TopicNodeLeaf = TopicNodeCommon & {
  node: 'leaf';
  partType: Reference;
};

export type TopicNode = TopicNodeBranch | TopicNodeLeaf;

export type EffortUnit = { unit: 'hours_and_minutes' } | { unit: 'academic_hours'; minutesInAcademicHour: number };

export type EffortLookup = {
  [key: string]: number;
};

export type TopicItem = {
  id: string;
  eduPlanRowId: string;
  parent: Reference | undefined;
  partType: Reference;
  caption: string;
  efforts: RawEffort[];
};

// eduPlanRowId?: string;
// currentRowId?: string;
// currentRowPath?: string;

export type AddTopicItem = Omit<TopicItem, 'id' | 'partType'> & Partial<Pick<TopicItem, 'partType'>>;

export type UpdateTopicItem = Omit<TopicItem, 'eduPlanRowId'>;

export type FormAddTopicItem = Omit<AddTopicItem, 'efforts'> & {
  efforts: EffortLookup;
};

export type FormUpdateTopicItem = Omit<TopicItem, 'efforts'> & {
  efforts: EffortLookup;
};

export type TopicGroup = {
  id: string;
  eduPlanRowId: string;
  parent: Reference | undefined;
  componentKind: Reference;
  caption: string;
  shortTitle: string;
};

export type AddTopicGroup = Omit<TopicGroup, 'id' | 'componentKind'> &
  Partial<Pick<TopicGroup, 'componentKind'>> & {
    id?: string;
  };

export type UpdateTopicGroup = Omit<TopicGroup, 'eduPlanRowId'>;
export type TopicRow = {
  id: string;
  activityId: string;
  node: 'branch' | 'leaf';
  title: string;
  efforts: EffortLookup;
  // react-table API
  expanded?: boolean;
};

export type PriorityTopicItem = {
  firstId:string;
  secondId:string;
  eduPlanRowId:string;
}
