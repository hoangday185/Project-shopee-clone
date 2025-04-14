import { http } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import config from './src/constants/config';
const resLogin = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZjMDk4MjE2Y2E0MDMzZWQxMjE2OCIsImVtYWlsIjoiaG9hbmdkYXkxODVAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNC0xNFQwODoxODo0Ni40ODdaIiwiaWF0IjoxNzQ0NjE4NzI2LCJleHAiOjE3NDUyMjM1MjZ9.m1FpN7j_MRYjrw-3P-NPkWsXqX_P1j-DQsPsP0Bk1z4',
    expires: 604800,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZjMDk4MjE2Y2E0MDMzZWQxMjE2OCIsImVtYWlsIjoiaG9hbmdkYXkxODVAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNC0xNFQwODoxODo0Ni40ODdaIiwiaWF0IjoxNzQ0NjE4NzI2LCJleHAiOjE3NTMyNTg3MjZ9.zuujdoUFLw25btmVZuajJzKNXi3PG66a_0zFEl2Ow98',
    expires_refresh_token: 8640000,
    user: {
      _id: '67efc098216ca4033ed12168',
      roles: ['User'],
      email: 'hoangday185@gmail.com',
      createdAt: '2025-04-04T11:20:56.080Z',
      updatedAt: '2025-04-10T08:10:43.693Z',
      __v: 0,
      date_of_birth: '2001-08-30T17:00:00.000Z',
      phone: '1233213123123',
      address: 'Đồng Nai 123',
      name: 'Việt Hoàng',
      avatar: '7929f062-8ebe-4b8c-bda9-d1221fddc65a.png'
    }
  }
};

export const restHandlers = [
  http.get(`${config.baseUrl}login`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(resLogin));
  })
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());
