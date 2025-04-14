import { screen, waitFor } from '@testing-library/react';
import path from 'src/constants/path';
import { renderWithRouter } from 'src/utils/test-render';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Login', () => {
  let email: HTMLInputElement;
  let password: HTMLInputElement;
  let button: HTMLElement;

  beforeAll(async () => {
    await waitFor(() => {
      expect(screen.queryByText(/Đăng nhập/i));
    });
    email = screen.queryByRole('input', { name: 'email' }) as HTMLInputElement;
    password = screen.queryByRole('input', { name: 'password' }) as HTMLInputElement;

    button = screen.queryByRole('button', { name: /login/i }) as HTMLElement;
  });

  it('Hiển thị lỗi require ko nhập gì cả', async () => {
    const { user } = renderWithRouter({ route: path.login });

    user.click(screen.queryByRole('button', { name: /login/i }) as HTMLElement);

    await waitFor(() => {
      expect(screen.queryByText(/Email là bắt buộc/i));
      expect(screen.queryByText(/Password là bắt buộc/i));
    });
  });

  it('Hiển thị lỗi sai định dạng email và password nhỏ hơn 6 ký tự', async () => {
    const { user } = renderWithRouter({ route: path.login });

    user.click(email);
    await user.paste('đồ chó');

    user.click(password);
    await user.paste('123');

    user.click(button);

    await waitFor(() => {
      expect(screen.queryByText(/Email không đúng định dạng /i));
      expect(screen.queryByText(/Độ dài password phải từ 6 đến 160 ký tự/i));
    });
  });

  it('Không nên hiển thị lỗi khi nhập lại đúng value', async () => {
    const { user } = renderWithRouter({ route: path.login });

    user.click(email);
    await user.paste('đồ chó');

    user.click(password);
    await user.paste('123');

    user.click(button);

    await waitFor(async () => {
      user.click(email);
      await user.paste('hoangday185@gmail.com');

      user.click(password);
      await user.paste('12345678');

      expect(!screen.queryByText(/Email không đúng định dạng /i));
      expect(!screen.queryByText(/Độ dài password phải từ 6 đến 160 ký tự/i));

      user.click(button);
    });
  });
});
