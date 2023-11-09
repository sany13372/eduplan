import { ValidationErrors } from '@utils/validation';
import { getErrorCodes, formatErrorMessagesByPath } from '@utils/api';

// TODO: добавить коды ошибок, приходящие от сервера, после перехода на кастомные экшены.
const formatCreateUpdateErrorMessage = () => undefined;

export const convertCreateUpdateError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateErrorMessage);
