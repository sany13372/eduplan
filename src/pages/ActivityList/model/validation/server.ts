import { getErrorCodes, formatErrorMessage } from '@utils/api';

const formatRemoveEduPlanRowMessage = () => undefined;

export const convertRemoveEduPlanRowError = (error: Error): string =>
  formatErrorMessage(getErrorCodes(error), formatRemoveEduPlanRowMessage);
