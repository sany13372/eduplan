import { getErrorCodes, formatErrorMessage } from '@utils/api';

const formatRemoveMessage = () => {
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};

export const convertRemoveError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveMessage);
