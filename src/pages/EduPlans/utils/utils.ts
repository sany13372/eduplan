import { EduPlan_bool_exp } from '@src/gql-client/schema.generated';
import type { GQtyError } from 'gqty';

// Escapes all occurrences of _ and % in a string for use in _like / _ilike expressions.
//
// https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query/#whereexp
// https://www.postgresql.org/docs/current/functions-matching.html
//
export const likeEscape = (text: string): string => {
  return text.replace(/_/g, '\\_').replace(/%/g, '\\%');
};

export const andEduPlanBoolExp = (exps: (EduPlan_bool_exp | undefined)[]): EduPlan_bool_exp | undefined => {
  const definedExps = exps.filter((e): e is EduPlan_bool_exp => !!e);

  if (definedExps.length === 0) {
    return undefined;
  }

  if (definedExps.length === 1) {
    return definedExps[0];
  }

  return { _and: definedExps };
};
export const orEduPlanBoolExp = (exps: (EduPlan_bool_exp | undefined)[]): EduPlan_bool_exp | undefined => {
  const definedExps = exps.filter((e): e is EduPlan_bool_exp => !!e);

  if (definedExps.length === 0) {
    return undefined;
  }

  if (definedExps.length === 1) {
    return definedExps[0];
  }

  return { _or: definedExps };
};

export const isGraphQLError = (error: Error): error is GQtyError =>
  typeof (error as GQtyError).graphQLErrors !== 'undefined';
