import { ValidationErrors } from '@utils/validation';
import { getErrorCodes, formatErrorMessagesByPath } from '@utils/api';

const formatCreateUpdateTemplateErrorMessage = () => undefined;

export const convertCreateUpdateTemplateError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatCreateUpdateTemplateErrorMessage);
