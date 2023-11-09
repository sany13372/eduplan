export type SemesterInfo = {
  id: string;
  name: string;
  activityList: ActivityInfo[];
};

export type ActivityInfo = {
  id: string;
  name: string;
  teacherList: TeacherInfo[];
};

export type TeacherInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  tenant: TenantInfo;
};

export type TenantInfo = {
  id: string;
  title: string;
  shortTitle: string;
};

export type UpdateTeacherListData = {
  path: string;
  teacherList: TeacherInfo[];
};
