import format from 'date-fns/format';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';

const studentFormat = 'yyyy-MM-dd';
const createEventFormat = "yyyy-MM-dd'T'HH:mmXXX";
const eventsFormat = "yyyy-MM-dd'T'HH:mmXXX";
const serverDateStringToFormat = "dd-MM-yyyy'T'HH:mm:ss";
const serverDateStringFromFormat = "yyyy-MM-dd'T'HH:mm:ss";

const localDateStringFormat = 'ddMMyyyyHHmm';
const localDateStringPrettyFormat = "dd.MM.yyyy HH:mm 'МСК'";
const localDateStringPrettyFormatNew = 'dd.MM.yyyy HH:mm';

export const serverDateStringToDate = (dateString: string): Date =>
  parse(dateString, serverDateStringFromFormat, new Date());

export const dateToServerDateString = (date: Date): string => format(date, serverDateStringToFormat);

export const localDateStringToDate = (dateString: string): Date => parse(dateString, localDateStringFormat, new Date());

export const dateToLocalDateString = (date: Date): string => format(date, localDateStringFormat);
export const dateToLocalDateStringPretty = (date: Date): string => format(date, localDateStringPrettyFormat);
export const dateToLocalDateStringPrettyNew = (date: Date): string => format(date, localDateStringPrettyFormatNew);

export const localeToServerDateString = (val: string): string => dateToServerDateString(localDateStringToDate(val));
export const serverToLocalDateString = (val: string): string => {
  return dateToLocalDateString(serverDateStringToDate(val));
};

export const localeToCreateEventDateString = (val: string): string =>
  format(parse(val, localDateStringFormat, new Date()), createEventFormat);

export const isValidDate = (date: Date): boolean => isValid(date);

export const dateToEventsDateString = (date: Date): string => format(date, eventsFormat);
export const dateToStudentDateString = (date: Date): string => format(date, studentFormat);

export const localDateStringDate = (val: string): Date => {
  return parse(val, 'ddMMyyyy', new Date());
};

export const localDateToServerDateString = (val: string): string => {
  return format(localDateStringDate(val), 'yyyy-MM-dd');
};

export const localDateToPrettyString = (val: string): string => {
  return format(localDateStringDate(val), 'dd.MM.yyyy');
};
