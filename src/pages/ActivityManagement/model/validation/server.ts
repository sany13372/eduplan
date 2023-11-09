import { ValidationErrors } from '@utils/validation';
import {
  getErrorCodes,
  formatErrorMessagesByPath,
  KnownServerValidationErrorCodes,
  formatErrorMessage,
} from '@utils/api';

const formatCreateUpdateActivityErrorMessage = (path = '', code: string) => {
  if (path === '') {
    if (code === KnownServerValidationErrorCodes.uniqueViolation) {
      return 'Учебное мероприятие с таким названием уже добавлено для части срока освоения.';
    }
    if (code === KnownServerValidationErrorCodes.unrelatedEduGridElement) {
      return 'Элемент учебной сетки не принадлежит выбранному плану обучения';
    }
  }
  return undefined;
};
export const convertCreateUpdateActivityError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateActivityErrorMessage);

const formatCreateUpdateActivityGroupErrorMessage = (path = '', code: string) => {
  if (path === '') {
    if (code === KnownServerValidationErrorCodes.uniqueViolation) {
      return 'Группа дисциплин (модулей) по выбору с таким названием уже добавлен для части срока освоения.';
    }
    if (code === KnownServerValidationErrorCodes.unrelatedEduGridElement) {
      return 'Элемент учебной сетки не принадлежит выбранному плану обучения';
    }
  }
  return undefined;
};

export const convertCreateUpdateActivityGroupError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateActivityGroupErrorMessage);

const formatRemoveEduPlanRowMessage = () => undefined;

export const convertRemoveEduPlanRowError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveEduPlanRowMessage);
