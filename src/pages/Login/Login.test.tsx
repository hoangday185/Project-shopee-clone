import { screen, waitFor } from '@testing-library/react';
import path from 'src/constants/path';
import { renderWithRouter } from 'src/utils/test-render';
import { describe, expect, it } from 'vitest';

describe('Login', () => {
  it('Hiển thị lỗi require ko nhập gì cả', async () => {
    const { user } = renderWithRouter({ route: path.login });
    await waitFor(() => {
      expect(screen.getByText(/Đăng nhập/i));
    });
    user.click(screen.queryByRole('button', { name: /login/i }) as HTMLElement);

    await waitFor(() => {
      expect(screen.queryByText(/Email là bắt buộc/i));
      expect(screen.queryByText(/Password là bắt buộc/i));
    });
  });
});
