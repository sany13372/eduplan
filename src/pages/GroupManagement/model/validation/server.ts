import { ValidationErrors } from '@utils/validation';
import {
  getErrorCodes,
  formatErrorMessagesByPath,
  KnownServerValidationErrorCodes,
  formatErrorMessage
} from '@utils/api';

// TODO: добавить коды ошибок, приходящие от сервера, после перехода на кастомные экшены.
const formatCreateUpdateGroupErrorMessage = () => undefined;

export const convertCreateUpdateGroupError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateGroupErrorMessage);

const formatCreateUpdateStudentErrorMessage = (path = '', code: string) => {
  if (path === 'innNumber') {
    if (code === KnownServerValidationErrorCodes.inconsistentInn) {
      return 'Некорректный номер ИНН';
    }
  }
  if (path === 'snilsNumber') {
    if (code === KnownServerValidationErrorCodes.inconsistentSnils) {
      return 'Некорректный номер СНИЛС';
    }
  }
  if (path === 'email') {
    if (code === KnownServerValidationErrorCodes.inconsistentEmail) {
      return 'Некорректный адрес эл. почты';
    }
    if (code === KnownServerValidationErrorCodes.uniqueViolation) {
      return 'Обучающийся с такой почтой уже добавлен для плана обучения';
    }
  }
  return undefined;
};

export const convertCreateUpdateStudentError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateStudentErrorMessage);

const formatRemoveMessage = (path: string, code: string) => {
  if (code === KnownServerValidationErrorCodes.notFound) {
    return 'Удаляемая группа не найдена.';
  }
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};

export const convertRemoveError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveMessage);