import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorResponse } from 'src/@types/utils.type';
import userApi from 'src/apis/user.api';
import Button from 'src/components/Button/Button';
import Input from 'src/components/Input';
import InputNumber from 'src/components/InputNumber';
import { AppContext } from 'src/contexts/app.context';
import { setProfileToLS } from 'src/utils/auth';
import { userSchema, UserSchema } from 'src/utils/rules';
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils';
import DateSelect from '../Components/DateSelect';

type FormData = Pick<UserSchema, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'>;
type FormDataError = Omit<FormData, 'date_of_birth'> & { date_of_birth: string };
const profileSchema = userSchema.pick(['name', 'phone', 'address', 'date_of_birth', 'avatar']);
const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const previewImage = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  const { setProfile } = useContext(AppContext);
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
    resolver: yupResolver<FormData>(profileSchema)
  });

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  });

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = profile?.avatar;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const resUploadAvatar = await uploadAvatarMutation.mutateAsync(formData);
        avatarName = resUploadAvatar.data.data;
        setValue('avatar', avatarName);
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth ? data.date_of_birth.toISOString() : new Date(1990, 0, 1).toISOString(),
        avatar: avatarName
      });
      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      refetch();
      // toast.success(res.data.message);
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data as FormDataError;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, { message: formError[key as keyof FormDataError], type: 'Server' });
          });
        }
      }
    }
  });

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0];
    setFile(fileFromLocal);
  };

  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200  py-6'>
        <h1 className=' text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật thông tin</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
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
                    errorMessage={errors.phone?.message}
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
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect value={field.value} onChange={field.onChange} errorMessage={errors.date_of_birth?.message} />
            )}
          />
          <div className='mt-4 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                type={'submit'}
                className='flex items-center h-9 bg-orange text-center text-sm text-white px-5 hover:bg-orange/80 rounded-sm'
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
                src={previewImage || getAvatarUrl(profile?.avatar)}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' accept='.jpg,.jpeg,.png' className='hidden' ref={fileInputRef} onChange={onFileChange} />
            <button
              className='mt-5 flex h-10 items-center justify-center rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
              type='button'
              onClick={handleUpload}
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
