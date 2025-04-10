import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { omit } from 'lodash';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ErrorResponse } from 'src/@types/utils.type';
import userApi, { BodyUpdateProfile } from 'src/apis/user.api';
import Button from 'src/components/Button/Button';
import Input from 'src/components/Input';
import { userSchema, UserSchema } from 'src/utils/rules';
import { isAxiosUnprocessableEntityError } from 'src/utils/utils';

type ChangePasswordSchema = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>;
const changePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password']);

const ChangePassword = () => {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver<ChangePasswordSchema>(changePasswordSchema)
  });

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']) as BodyUpdateProfile);
      reset();
      toast.success(res.data.message);
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<ChangePasswordSchema>>(error)) {
        const formError = error.response?.data.data as ChangePasswordSchema;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof ChangePasswordSchema, {
              message: formError[key as keyof ChangePasswordSchema] as string,
              type: 'Server'
            });
          });
        }
      }
    }
  });

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200  py-6'>
        <h1 className=' text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật thông tin</div>
      </div>

      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Mật khẩu cũ :</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
                className='relative'
                register={register}
                placeholder='Mật khẩu cũ'
                name='password'
                errorMessage={errors.password?.message}
                type='password'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Mật khẩu mới :</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
                className='relative'
                register={register}
                placeholder='Mật khẩu mới'
                name='new_password'
                errorMessage={errors.new_password?.message}
                type='password'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Nhập lại mật khẩu :</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
                className='relative'
                register={register}
                placeholder='Mật khẩu mới'
                name='confirm_password'
                errorMessage={errors.confirm_password?.message}
                type='password'
              />
            </div>
          </div>

          <div className='mt-4 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type={'submit'}
                className='flex items-center h-9 bg-orange text-center text-sm text-white px-5 hover:bg-orange/80 rounded-sm'
              >
                Cập nhật mật khẩu mới
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
