import type { GQtyError } from 'gqty';
import {
  ApiError,
  BackendError,
  BoolOperator,
  ErrorData,
  ErrorInfo,
  HasuraError,
  ObjBoolExp,
  ResponseErrorDataObj,
} from '@src/gql-client/types';
import { NormalizedError } from '@src/gql-client/errors';

import { EduProgram_bool_exp } from './schema.generated';

// Escapes all occurrences of _ and % in a string for use in _like / _ilike expressions.
//
// https://hasura.io/docs/latest/graphql/core/api-reference/graphql-api/query/#whereexp
// https://www.postgresql.org/docs/current/functions-matching.html
//
export const likeEscape = (text: string): string => {
  return text.replace(/_/g, '\\_').replace(/%/g, '\\%');
};

export const andEduProgramBoolExp = (exps: (EduProgram_bool_exp | undefined)[]): EduProgram_bool_exp | undefined => {
  const definedExps = exps.filter((e): e is EduProgram_bool_exp => !!e);

  if (definedExps.length === 0) {
    return undefined;
  }

  if (definedExps.length === 1) {
    return definedExps[0];
  }

  return { _and: definedExps };
};

export const isGraphQLError = (error: Error): error is GQtyError =>
  typeof (error as GQtyError).graphQLErrors !== 'undefined';

export const isApiError = (resp: ErrorData): resp is ApiError => Array.isArray((resp as ApiError).extensions);
export const isBackendError = (resp: ErrorData): resp is BackendError => Array.isArray((resp as BackendError).path);
export const isHasuraError = (resp: ErrorData): resp is HasuraError =>
  new RegExp(/^\$.*$/gm).test((resp as HasuraError).extensions.path);

export const prepareErrors = (errors: Error | ErrorData[]): ResponseErrorDataObj => {
  const resp: ResponseErrorDataObj = {
    api: [],
    io: [],
    backend: [],
    hasura: [],
  };
  if (!Array.isArray(errors)) {
    resp.io.push(errors);
    return resp;
  }
  errors.forEach((err) => {
    if (isApiError(err)) resp.api.push(err);
    if (isBackendError(err)) resp.backend.push(err);
    if (isHasuraError(err)) resp.hasura.push(err);
  });
  return resp;
};

export const prepareErrorInfoList = (errors: ResponseErrorDataObj): ErrorInfo[] => {
  const resp: ErrorInfo[] = [];
  errors.backend.forEach(({ extensions: { code = '' }, message }) =>
    resp.push({
      code,
      path: '',
      isBackend: true,
      message: message ?? '',
    }),
  );
  errors.api.forEach((e) => {
    e.extensions.forEach(({ code = '', path = '' }) =>
      resp.push({
        code,
        path,
        isBackend: false,
      }),
    );
  });
  return resp;
};

export const isNormalizedError = (err: Error): err is NormalizedError => err.name === 'NormalizedError';

export const getBoolExp = <T extends Record<string, unknown>>(
  exps: ObjBoolExp<T>[],
  operator: BoolOperator,
): ObjBoolExp<T> | undefined => {
  const definedExps = exps.filter((e): e is T => !!e);

  if (definedExps.length === 0) {
    return undefined;
  }

  if (definedExps.length === 1) {
    return definedExps[0];
  }

  return { [operator]: definedExps };
};

export const hasExpiredTokenError = (errors: HasuraError[]) => {
  return Boolean(errors.find((e) => e.message === 'Could not verify JWT: JWTExpired'));
};
