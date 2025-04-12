import { AxiosError } from 'axios';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { describe, expect, it } from 'vitest';
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils';

describe('isAxiosError', () => {
  it('isAxiosError trả về boolean', () => {
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosErrorUnprocessableEntityError trả về boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false);
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false);
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true);
  });
});
