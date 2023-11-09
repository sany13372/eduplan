export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type OptionalVal<T> = T | undefined;

export type GroupInfo = {
  id: string;
  title: string;
};

export interface EduGroupListState {
  pageIndex: number;
  pageSize: number;
  globalFilter?: undefined;
}

export interface GetEduGroupListParams {
  state: EduGroupListState;
  eduPlanId?: string;
}
export interface EduGroupListInfo {
  items: GroupInfo[];
  totalItemCount: number;
}
