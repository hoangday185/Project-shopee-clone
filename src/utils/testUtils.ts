import { screen, waitFor, type waitForOptions } from '@testing-library/react';
import { expect } from 'vitest';
const delay = (time: number) => new Promise((resolve) => setTimeout(() => resolve(true), time));

export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 2000 } = options || {};
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true);
    },
    {
      ...options,
      timeout
    }
  );
  screen.debug(body, 999999);
};
