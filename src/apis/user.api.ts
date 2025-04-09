import { User } from 'src/@types/users.type';
import { SuccessResponse } from 'src/@types/utils.type';
import http from 'src/utils/http';

interface BodyUpdateProfile extends Omit<User, '_id' | 'email' | 'createdAt' | 'updatedAt' | 'roles'> {
  password?: string;
  newPassword?: string;
}

const userApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('/me');
  },
  updateProfile(data: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('/user', data);
  },
  uploadAvatar(data: FormData) {
    return http.post<SuccessResponse<String>>('/user/upload-avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default userApi;
