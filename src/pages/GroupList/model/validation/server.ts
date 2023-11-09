import { getErrorCodes, KnownServerValidationErrorCodes, formatErrorMessage } from '@utils/api';

const formatRemoveMessage = (path: string, code: string) => {
  if (code === KnownServerValidationErrorCodes.notFound) {
    return 'Удаляемая группа не найдена.';
  }
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};

export const convertRemoveError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveMessage);
