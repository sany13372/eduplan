import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import pickBy from 'lodash/pickBy';
import { isGraphQLError, isNormalizedError } from '@src/gql-client';
import { ValidationMessages } from '@src/utils/validation';

export interface ServerValidationErrorCodesByPath {
  [field: string]: string[];
}

interface ServerValidationError {
  path?: string | undefined;
  code: string;
}

const findValidationErrors = (error: Error) => {
  if (!isGraphQLError(error)) {
    return [];
  }

  if (!error.graphQLErrors) {
    return [];
  }

  const validationGraphQLError = error.graphQLErrors[0];
  if (!validationGraphQLError) {
    return [];
  }

  // NOTE: Определение типа GraphQLError предполагает, что поле extensions будет объектом ({...}),
  //       но в случае данного API extension содержит массив объектов ([{...}, {...}, ...]). Это
  //       несоответствие типов требует промежуточное приведение к типу any сделанное ниже.
  return validationGraphQLError.extensions as never as ServerValidationError[];
};

const groupErrorCodesByPath = (errors: ServerValidationError[]): ServerValidationErrorCodesByPath => {
  return mapValues(
    groupBy(errors, (e) => e.path || ''),
    (es) => es.map((e) => e.code),
  );
};

export const getErrorCodes = (error: Error) => {
  const serverValidationErrors = !isNormalizedError(error) ? findValidationErrors(error) : error.info;
  return groupErrorCodesByPath(serverValidationErrors);
};

export const KnownServerValidationErrorCodes = {
  fieldRequired: 'FIELD_REQUIRED',
  forbiddenSymbols: 'FORBIDDEN_SYMBOLS',
  insufficientLength: 'INSUFFICIENT_LENGTH',
  exceededLength: 'EXCEEDED_LENGTH',
  uniqueViolation: 'UNIQUE_VIOLATION',
  notEditable: 'NOT_EDITABLE',
  uniqueViolationSpaceAndTitle: 'UNIQUE_VIOLATION_SPACE_AND_TITLE',
  linkedEduPlan: 'LINKED_EDU_PLAN',
  linkedEduGroup: 'LINKED_EDU_GROUP',
  linkedStudent: 'LINKED_STUDENT',
  notFound: 'NOT_FOUND',
  unrelatedEduGridElement: 'UNRELATED_EDU_GRID_ELEMENT',
  inconsistentSnils: 'INCONSISTENT_SNILS',
  inconsistentInn: 'INCONSISTENT_INN',
  inconsistentEmail: 'INCONSISTENT_EMAIL',
} as const;

export const defaultErrorMessage = (path: string, code: string) => {
  if (
    code === KnownServerValidationErrorCodes.fieldRequired ||
    code === KnownServerValidationErrorCodes.insufficientLength
  ) {
    return ValidationMessages.required();
  }

  if (code === KnownServerValidationErrorCodes.forbiddenSymbols) {
    return ValidationMessages.invalidFormat();
  }

  if (code === KnownServerValidationErrorCodes.exceededLength) {
    return ValidationMessages.maxLengthExceeded();
  }

  if (code === KnownServerValidationErrorCodes.notEditable) {
    return ValidationMessages.notEditable();
  }

  return undefined;
};

const formatErrorMessagesOfPath = (
  path: string,
  codes: string[],
  getMessage: (path: string, code: string) => string | undefined,
) => {
  return codes
    .map((code) => getMessage(path, code) || defaultErrorMessage(path, code))
    .filter((message) => !!message)
    .join('\n');
};

export const formatErrorMessagesByPath = (
  errorCodes: ServerValidationErrorCodesByPath,
  getMessage: (path: string, code: string) => string | undefined,
) => {
  const messagesByPath = mapValues(errorCodes, (codes, path) => formatErrorMessagesOfPath(path, codes, getMessage));
  return pickBy(messagesByPath, (messages) => messages.length > 0);
};

export const formatErrorMessage = (
  errorCodes: ServerValidationErrorCodesByPath,
  getMessage: (path: string, code: string) => string | undefined,
) => {
  return values(formatErrorMessagesByPath(errorCodes, getMessage)).join('\n');
};
