import {
  getErrorCodes,
  formatErrorMessage,
  KnownServerValidationErrorCodes,
  formatErrorMessagesByPath,
} from '@utils/api';
import { ValidationErrors, ValidationMessages } from '@utils/validation';
import { AllowedSymbols, eduPlanLimits } from '@src/pages/EduPlans/model/validation/constants';

const formatCreateUpdateErrorMessage = (path = '', code: string) => {
  if (code === KnownServerValidationErrorCodes.forbiddenSymbols) {
    return AllowedSymbols.message;
  }

  if (path === 'title') {
    if (code === KnownServerValidationErrorCodes.exceededLength) {
      return ValidationMessages.maxLengthExceeded({ max: eduPlanLimits.titleMaxLength });
    }
  }

  if (path === 'shortTitle') {
    if (code === KnownServerValidationErrorCodes.exceededLength) {
      return ValidationMessages.maxLengthExceeded({ max: eduPlanLimits.shortTitleMaxLength });
    }
  }
  if (!path) {
    if (code === KnownServerValidationErrorCodes.uniqueViolation) {
      return 'В образовательном пространстве план обучения с таким названием и параметрами уже создан.';
    }
    return 'Что-то пошло не так. Попробуйте ещё раз.';
  }
  return undefined;
};
const formatRemoveMessage = (path: string, code: string) => {
  if (code === KnownServerValidationErrorCodes.notFound) {
    return 'Удаляемый план обучения не найден.';
  }
  return 'Что-то пошло не так. Попробуйте ещё раз.';
};
export const convertCreateUpdateError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateErrorMessage);

export const convertRemoveError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveMessage);
