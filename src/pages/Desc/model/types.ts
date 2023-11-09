export type EduPlanDesc = {
  id: string;
  b2b?: Desc;
  b2c?: Desc;
};

export type Desc = {
  isPubl: boolean;
  description?: string;
  target?: string;
  result?: string;
  price?: string;
  url?: string;
  priority?: string;
  landing?: string;
};

export type ServiceInfo = {
  b2b: GroupDesc;
  b2c: GroupDesc;
};

export type GroupDesc = {
  title: string;
  desc: string;
};
