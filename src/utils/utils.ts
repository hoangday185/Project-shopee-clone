import axios, { AxiosError } from 'axios';
import { ErrorResponse } from 'src/@types/utils.type';
import userImg from 'src/assets/user.svg';
import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  );
}

//cu phap -? loai bo undefined cua key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<Exclude<T[P], null | undefined>>;
};

export type NoUndefinedFieldV2<T> = Exclude<T, undefined | null>;

export const rateSale = (original: number, sale: number): string =>
  Math.round(((original - sale) / original) * 100) + '%';

export const removeSpecialCharacter = (str: string): string =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '');

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`;
};

export const generateIdFormNameId = (nameId: string): string => {
  const arr = nameId.split('-i-');
  return arr[arr.length - 1];
};

export const getAvatarUrl = (avatar?: string): string => (avatar ? `${config.baseUrl}images/${avatar}` : userImg);
