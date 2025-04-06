import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import userApi from 'src/apis/user.api';
import Button from 'src/components/Button/Button';
import Input from 'src/components/Input';
import InputNumber from 'src/components/InputNumber';
import { userSchema, UserSchema } from 'src/utils/rules';

type FormData = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>;
const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar']);
const Profile = () => {
  const {
    register,
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  });

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });

  const profile = profileData?.data.data;
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name);
      setValue('phone', profile.phone);
      setValue('address', profile.address);
      setValue('avatar', profile.avatar);
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile, setValue]);

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200  py-6'>
        <h1 className=' text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật thông tin</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email:</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên :</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
                register={register}
                placeholder='Tên'
                name='name'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
                    placeholder='Số điện thoại'
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ :</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
                register={register}
                placeholder='Địa chỉ'
                name='address'
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày sinh :</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <select name='' id='' className='h-10 w-[32%] border border-black/10 rounded-sm px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select name='' id='' className='h-10 w-[32%] border border-black/10 rounded-sm px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select name='' id='' className='h-10 w-[32%] border border-black/10 rounded-sm px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mt-4 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type={'submit'}
                className='flex items-center h-9 bg-orange text-center text-sm text-white px-5 hover:bg-orange/80'
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://avatars.githubusercontent.com/u/108289635?v=4'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' accept='.jpg,.jpeg,.png' className='hidden' />
            <button
              className='mt-5 flex h-10 items-center justify-center rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
            >
              Chọn ảnh
            </button>
            <div className='my-3 text-gray-400'>
              <div>Dung lượng file tối đa 1MB</div>
              <div>Định dạng: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
