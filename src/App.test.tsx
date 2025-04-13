import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import App from './App';
import path from './constants/path';
import { renderWithRouter } from './utils/test-render';
import { logScreen } from './utils/testUtils';

describe('App', () => {
  test('App render và chuyển trang', async () => {
    const { user } = renderWithRouter();

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
      expect(screen.getAllByText('Bạn đã có tài khoản?'));
    });

    screen.debug(document.body.parentElement as HTMLElement, 999999);
  });

  test('Về trang not found', async () => {
    const badRoute = '/ahihi/do-cho';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    // await waitFor(() => {
    //   expect(screen.getByText(/Page not found/i));
    // });
    await logScreen();
  });

  test('Render trang register', async () => {
    window.history.pushState({}, 'Test page', path.register);
    render(<App />, { wrapper: BrowserRouter });
    // render(
    //   //cách 1
    //   <MemoryRouter initialEntries={[path.register]}>
    //     <App />
    //   </MemoryRouter>
    // );
    renderWithRouter({ route: path.register });

    await waitFor(() => {
      expect(screen.getAllByText('Bạn đã có tài khoản?'));
    });
  });
});
