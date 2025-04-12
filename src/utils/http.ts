import axios, { AxiosError, type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import { AuthResponse, RefreshTokenResponse } from 'src/@types/auth.types';
import { ErrorResponse } from 'src/@types/utils.type';
import { URL_AUTH } from 'src/apis/auth.api';
import config from 'src/constants/config';
import HttpStatusCode from 'src/constants/httpStatusCode.enum';
import {
  clearLocalStorage,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth';
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null = null;
  constructor() {
    this.accessToken = getAccessTokenFromLS(); //khởi tạo sẵn 1 biến access token bởi
    //vì khi mới vào app của chúng ta thì constructor này sẽ chạy đầu tiên và mỗi lần request lên thì ta sẽ có sẵn biến này
    //đỡ phải vào ls để lấy ra giúp tăng performance
    this.refreshToken = getRefreshTokenFromLS(); //khởi tạo sẵn 1 biến refresh token bởi
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 1,
        'expire-refresh-token': 5
      }
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_AUTH.LOGIN || url === URL_AUTH.REGISTER) {
          this.accessToken = (response.data as AuthResponse).data.access_token;
          this.refreshToken = (response.data as AuthResponse).data.refresh_token;
          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setProfileToLS((response.data as AuthResponse).data.user);
        } else if (url === 'logout') {
          this.accessToken = '';
          clearLocalStorage();
        }
        return response;
      },
      async (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error?.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          //trường hợp token hết hạn và request đó ko phải của request refresh token
          //thì ta sẽ gọi hàm refresh token
          const config = error.response?.config;
          const url = config?.url;
          if (isAxiosExpiredTokenError(error) && url !== URL_AUTH.REFRESH_TOKEN) {
            //trường hợp token hết hạn và request đó ko phải của request refresh token
            //thì ta sẽ gọi hàm refresh token
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config?.headers, authorization: access_token } });
            });
          }
          clearLocalStorage();
          this.accessToken = '';
          this.refreshToken = '';
          console.log(error);
          toast.error(error.response?.data?.message);
          // window.location.reload()
        }
        return Promise.reject(error);
      }
    );
  }

  private async handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_AUTH.REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data;
        setAccessTokenToLS(access_token);
        this.accessToken = access_token;
        return access_token;
      })
      .catch((err) => {
        this.accessToken = '';
        this.refreshToken = '';
        clearLocalStorage();
        throw err;
      });
  }
}

const http = new Http().instance;
export default http;
