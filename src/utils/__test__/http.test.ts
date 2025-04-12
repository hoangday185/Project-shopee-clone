import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import { beforeEach, describe, expect, it } from 'vitest';
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth';
import { Http } from '../http';

describe('http axios', () => {
  let http = new Http().instance;
  beforeEach(() => {
    localStorage.clear(); //xóa localstorage trước mỗi test case sau đó khởi tạo lại http instance
    //do trong constructor của http có gọi hàm getAccessTokenFromLS và getRefreshTokenFromLS nên nó sẽ cache lại 2 biến này
    http = new Http().instance;
  });
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZjMDk4MjE2Y2E0MDMzZWQxMjE2OCIsImVtYWlsIjoiaG9hbmdkYXkxODVAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNC0xMlQxMzowMjo0Ny4zMThaIiwiaWF0IjoxNzQ0NDYyOTY3LCJleHAiOjE3NDQ0NjI5Njh9.7V9T30DbcEtKwWPQ0l9HlpdAD6vRM6cF7QBjo-1jr9k';

  const refresh_token_1000d =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZjMDk4MjE2Y2E0MDMzZWQxMjE2OCIsImVtYWlsIjoiaG9hbmdkYXkxODVAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNC0xMlQxMzowMjo0Ny4zMThaIiwiaWF0IjoxNzQ0NDYyOTY3LCJleHAiOjE3NTMxMDI5Njd9.FUsry1u4PneMfkjIjjFqFhLKiYZ0k6qVFu7gj7Vltm4';

  it('Gọi api', async () => {
    const res = await http.get('products');
    expect(res.status).toBe(HttpStatusCode.Ok);
  });
  it('Auth request', async () => {
    await http.post('login', {
      email: 'hoangday185@gmail.com',
      password: '12345678'
    });

    const res = await http.get('me');
    expect(res.status).toBe(200);
  });
  it('refresh-token', async () => {
    setAccessTokenToLS(access_token_1s);
    setRefreshTokenToLS(refresh_token_1000d);
    http = new Http().instance;
    const res = await http.get('me');
    console.log(res);
    expect(res.status).toBe(HttpStatusCode.Ok);
  });
});
