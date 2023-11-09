import { EduPlan_bool_exp, order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import {
  EduPlanListInfo,
  EduPlanListState,
  EduPlanShortInfo,
  EduStartDateFilter,
  GetEduPlanListParams,
} from '@src/pages/EduPlansList/model/types';
import { andEduPlanBoolExp, likeEscape, orEduPlanBoolExp } from '@src/pages/EduPlansList/utils/utils';
import { emptyEduStartDate, emptyEnrollmentYear } from '@src/pages/EduPlansList/model/constants';

type QueryArgsType = Parameters<typeof query.readEduPlans>[0];

const getEduStartDateCriteria = (filter: EduStartDateFilter): EduPlan_bool_exp | undefined => {
  const { to, from } = filter;
  const toId = to?.id;
  const fromId = from?.id;
  const { id: emptyId } = emptyEduStartDate;
  const emptyCriteria = { _is_null: true };
  if (fromId && !toId)
    return {
      eduStartDate: fromId === emptyId ? emptyCriteria : { _gte: new Date(fromId).toDateString() },
    };
  if (!fromId && toId)
    return {
      eduStartDate: toId === emptyId ? emptyCriteria : { _lte: new Date(toId).toDateString() },
    };

  if (fromId && toId && (fromId === emptyId || toId === emptyId)) {
    return orEduPlanBoolExp([
      {
        eduStartDate: fromId === emptyId ? emptyCriteria : { _gte: new Date(fromId).toDateString() },
      },
      {
        eduStartDate: toId === emptyId ? emptyCriteria : { _lte: new Date(toId).toDateString() },
      },
    ]);
  }
  if (fromId && toId && fromId !== emptyId && toId !== emptyId) {
    return andEduPlanBoolExp([
      {
        eduStartDate: { _gte: new Date(fromId).toDateString() },
      },
      {
        eduStartDate: { _lte: new Date(toId).toDateString() },
      },
    ]);
  }
  return undefined;
};

const toQueryArgs = (request: EduPlanListState, eduProgId?: string): QueryArgsType => {
  const notDeletedCriteria = { deletedAt: { _is_null: true } };

  const eduProgIdCriteria = eduProgId ? { eduProgramId: { _eq: eduProgId } } : undefined;
  const titleContainsCriteria = request.globalFilter?.title
    ? { title: { _ilike: `%${likeEscape(request.globalFilter.title)}%` } }
    : undefined;

  const eduFormCriteria = request.globalFilter?.eduForm
    ? { eduFormId: { _eq: request.globalFilter.eduForm.id as string } }
    : undefined;

  const eduTechnologyCriteria = request.globalFilter?.eduTechnology
    ? { eduTechnologyId: { _eq: request.globalFilter.eduTechnology.id as string } }
    : undefined;

  const competitionPeriodCriteria = request.globalFilter?.competitionPeriod
    ? { completionPeriodId: { _eq: request.globalFilter.competitionPeriod.id as string } }
    : undefined;

  const enrollmentYearEmptyCriteria =
    request.globalFilter?.enrollmentYear &&
    request.globalFilter.enrollmentYear.find((e) => e.id === emptyEnrollmentYear.id)
      ? { enrollmentYear: { _is_null: true } }
      : undefined;

  const enrollYearVals =
    request.globalFilter?.enrollmentYear?.filter((e) => e.id !== emptyEnrollmentYear.id).map((e) => e.id as number) ??
    [];
  const enrollmentYearCriteria =
    request.globalFilter?.enrollmentYear && enrollYearVals.length > 0
      ? { enrollmentYear: { _in: enrollYearVals } }
      : undefined;
  const eduStartDateCriteria = request.globalFilter?.eduStartDate
    ? getEduStartDateCriteria(request.globalFilter.eduStartDate)
    : undefined;
  return {
    where: {
      ...andEduPlanBoolExp([
        eduProgIdCriteria,
        notDeletedCriteria,
        titleContainsCriteria,
        eduFormCriteria,
        eduTechnologyCriteria,
        competitionPeriodCriteria,
        orEduPlanBoolExp([enrollmentYearCriteria, enrollmentYearEmptyCriteria]),
        eduStartDateCriteria,
      ]),
    },
    order_by: [{ title: order_by.asc }],
  };
};

const getOrgListItemCount = (queryArgs: QueryArgsType) => {
  const { aggregate } = castNotSkeletonDeep(query.readEduPlansAggregate(queryArgs));
  return aggregate?.count() || 0;
};

const getOrgListItems = (queryArgs: QueryArgsType): EduPlanShortInfo[] => {
  return query
    .readEduPlans(queryArgs)
    .map(castNotSkeletonDeep)
    .map(
      ({ id, title, enrollmentYear, eduStartDate, completionPeriodSetting, eduFormSetting, eduTechnologySetting }) => ({
        id,
        title,
        enrollmentYear: enrollmentYear ?? null,
        eduStartDate: eduStartDate ? new Date(eduStartDate) : null,
        competitionPeriod: {
          id: completionPeriodSetting?.completionPeriod?.id ?? '',
          caption: completionPeriodSetting?.completionPeriod?.title ?? '',
        },
        eduForm: {
          id: eduFormSetting?.eduForm?.id ?? '',
          caption: eduFormSetting?.eduForm?.title ?? '',
        },
        eduTechnology: {
          id: eduTechnologySetting?.eduTechnology?.id ?? '',
          caption: eduTechnologySetting?.eduTechnology?.title ?? '',
        },
      }),
    );
};

export const getEduPlanListQuery = (params: GetEduPlanListParams): EduPlanListInfo => {
  const { state: request, eduProgId } = params;
  const queryArgs = toQueryArgs(request, eduProgId);

  const totalItemCount = getOrgListItemCount(queryArgs);

  const items = getOrgListItems({
    ...queryArgs,
    offset: request.pageIndex * request.pageSize,
    limit: request.pageSize,
  });

  return { totalItemCount, items };
};
