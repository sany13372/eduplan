export interface ValidationMessage<TArgs = undefined> {
  (args?: TArgs): string;
}

export const required: ValidationMessage = () => 'Поле обязательно для заполнения.';
export const email: ValidationMessage = () => 'Некорректный адрес электронной почты.';

export const notEditable: ValidationMessage = () => 'Поле невозможно изменить.';

export interface InvalidFormatArgs {
  formatMessage: string;
}

export const invalidFormat: ValidationMessage<InvalidFormatArgs> = (args) => {
  const defaultText = 'Указано недопустимое значение.';
  if (!args) {
    return defaultText;
  }

  return `${defaultText} ${args.formatMessage}`;
};

export interface MaxLengthExceededArgs {
  max: number;
}

export const maxLengthExceeded: ValidationMessage<MaxLengthExceededArgs> = (args) => {
  const defaultText = 'Указанное значение длиннее, чем допустимо.';
  if (!args) {
    return defaultText;
  }

  return `${defaultText} Максимальная длина: ${args.max} символов.`;
};

export interface UnknownErrorArgs {
  errorMessage: string;
}

export const unknownError: ValidationMessage<UnknownErrorArgs> = (args) => {
  return args ? `Неизвестная ошибка: '${args.errorMessage}'.` : 'Неизвестная ошибка.';
};

export const ValidationMessages = {
  required,
  email,
  invalidFormat,
  maxLengthExceeded,
  unknownError,
  notEditable,
};
