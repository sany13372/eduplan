import { NormalizedError } from '@src/gql-client/errors';
import { getErrorCodes, formatErrorMessage, formatErrorMessagesByPath } from '@utils/api';
import { ValidationErrors } from '@utils/validation';

const formatRemoveMessage = () => {
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};

export const convertRemoveError = (error: Error): string => {
  if (error.name === 'NormalizedError') {
    return (error as NormalizedError).info[0].message ?? formatRemoveMessage();
  }
  return formatErrorMessage(getErrorCodes(error), formatRemoveMessage);
};

const formatCreateUpdateLessonErrorMessage = () => undefined;

export const convertCreateUpdateLessonError = (error: Error): ValidationErrors => {
  if (error.name === 'NormalizedError') {
    // Попап выводит только текст
    /**
     * @todo сделать более комплексный разбор ошибок
     */
    return { _: (error as NormalizedError).info[0].message ?? '' };
  }
  return formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateLessonErrorMessage);
};

export const convertCreateUpdateLessonSettingsError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateLessonErrorMessage);
