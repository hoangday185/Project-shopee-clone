import { beforeEach, describe, expect, it } from 'vitest';
import { getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '../auth';

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZjMDk4MjE2Y2E0MDMzZWQxMjE2OCIsImVtYWlsIjoiaG9hbmdkYXkxODVAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNC0xMlQxMjowMTowNi4wODFaIiwiaWF0IjoxNzQ0NDU5MjY2LCJleHAiOjE3NDUwNjQwNjZ9.CjDZvRbhmW_Co6ZyNDp6kXJRsHrqAYBzok-9eWBVMNs';

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZjMDk4MjE2Y2E0MDMzZWQxMjE2OCIsImVtYWlsIjoiaG9hbmdkYXkxODVAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wNC0xMlQxMjowMTowNi4wODFaIiwiaWF0IjoxNzQ0NDU5MjY2LCJleHAiOjE3NTMwOTkyNjZ9.krJusXc08KwatcVnZOslkXqL9ar18glXdzGtUqmt52U';

// const profile =
//   '{"_id":"67efc098216ca4033ed12168","roles":["User"],"email":"hoangday185@gmail.com","createdAt":"2025-04-04T11:20:56.080Z","updatedAt":"2025-04-10T08:10:43.693Z","__v":0,"date_of_birth":"2001-08-30T17:00:00.000Z","phone":"1233213123123","address":"Đồng Nai 123","name":"Việt Hoàng","avatar":"7929f062-8ebe-4b8c-bda9-d1221fddc65a.png"}';

beforeEach(() => {
  localStorage.clear(); //xóa localstorage trước mỗi test case
});

describe('access_token', () => {
  it('access token được set vào localstorage', () => {
    setAccessTokenToLS(access_token);
    expect(getAccessTokenFromLS()).toBe(access_token);
  });
});

describe('refresh_token', () => {
  it('refresh token được set vào localstorage', () => {
    setRefreshTokenToLS(refresh_token);
    expect(getRefreshTokenFromLS()).toBe(refresh_token);
  });
});

//clearLS
describe('clearLocalStorage', () => {
  it('localstorage được xóa', () => {
    setAccessTokenToLS(access_token); //set access token vào localstorage trước khi xóa
    setRefreshTokenToLS(refresh_token); //set refresh token vào localstorage trước khi xóa
    expect(localStorage.getItem('access_token')).toBe(access_token);
    expect(localStorage.getItem('refresh_token')).toBe(refresh_token);
    localStorage.clear(); //xóa localstorage
    expect(getAccessTokenFromLS()).toBe(''); //kiểm tra lại xem đã xóa chưa
    expect(getRefreshTokenFromLS()).toBe(''); //kiểm tra lại xem đã xóa chưa
  });
});
