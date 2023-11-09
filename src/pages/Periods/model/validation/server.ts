import { ValidationErrors } from '@utils/validation';
import { formatErrorMessagesByPath, getErrorCodes } from '@utils/api';

const formatSetPeriodErrorMessage = (path = '', code: string) => {
  if (path === '') {
    if (code === 'period-earlier-edu-plan-start') {
      return 'Дата начала периода не должна быть раньше даты начала обучения по плану';
    }
  }
  return undefined;
};

const convertSetPeriodError = (error: Error): ValidationErrors =>
  formatErrorMessagesByPath(getErrorCodes(error), formatSetPeriodErrorMessage);

// TODO: Заменить на адекватную работу с ошибками
export const getSetPeriodErrors = (e: Error) => {
  const resp = convertSetPeriodError(e);
  // @ts-ignore
  resp['dates'] = {};
  // @ts-ignore
  resp['dates']['start'] = resp[''];
  delete resp[''];
  return resp;
};
