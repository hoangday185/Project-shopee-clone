import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('App render và chuyển trang', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    await waitFor(
      () => {
        expect(screen.getByText(/Đăng nhập/i));
      },
      {
        timeout: 5000
      }
    );
    await user.click(screen.getByText(/Đăng nhập/i));

    await waitFor(() => {
      expect(screen.getByText('Bạn chưa có tài khoản?'));
    });

    await user.click(screen.getByText(/Đăng ký/i));

    await waitFor(() => {
      expect(screen.getByText('Bạn đã có tài khoản?'));
    });

    screen.debug(document.body.parentElement as HTMLElement, 999999);
  });
});
