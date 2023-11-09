import { getErrorCodes, formatErrorMessage, KnownServerValidationErrorCodes } from '@utils/api';

const formatRemoveMessage = (path: string, code: string) => {
  if (code === KnownServerValidationErrorCodes.notFound) {
    return 'Удаляемый план обучения не найден.';
  }
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};

export const convertRemoveError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveMessage);
