import { ValidationErrors } from '@utils/validation';
import { getErrorCodes, formatErrorMessagesByPath, formatErrorMessage } from '@utils/api';

const formatCreateUpdateIotErrorMessage = () => undefined;

export const convertCreateUpdateIotError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateIotErrorMessage);

const formatRemoveMessage = () => {
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};

export const convertRemoveError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveMessage);
