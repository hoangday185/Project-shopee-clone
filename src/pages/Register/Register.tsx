import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Schema

const Register = (): JSX.Element => {
  const {
    watch, //thằng này cùi ỉa làm component re-render
    register, //callback cung cấp thông tin cho react-hook-form
    handleSubmit,
    getValues,
    formState: { errors } //bắt lỗi ở errors này
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form
              className='p-10 rounded bg-white shadow-sm'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                placeholder='Email'
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
              />

              <Input
                name='password'
                register={register}
                placeholder='Password'
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                autoComplete='on'
              />
              <Input
                name='confirm_password'
                register={register}
                placeholder='Confirm password'
                type='password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='flex items-cente justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
