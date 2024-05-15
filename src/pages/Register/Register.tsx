import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/@types/utils.type'

type FormData = Schema

const Register = (): JSX.Element => {
  const {
    //watch, //thằng này cùi ỉa làm component re-render
    register, //callback cung cấp thông tin cho react-hook-form
    handleSubmit,
    setError, //dùng method của react hook form để set lỗi
    //getValues
    formState: { errors } //bắt lỗi ở errors này
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) =>
      registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (
          isAxiosUnprocessableEntityError<
            ResponseApi<Omit<FormData, 'confirm_password'>>
          >(error)
        ) {
          const formError = error.response?.data.data

          // if (formError) {
          //   Object.keys(formError).forEach((key) => {
          //     setError(key as keyof Omit<FormData, 'confirm_password'>, {
          //       message:
          //         formError[key as keyof Omit<FormData, 'confirm_password'>],
          //       type: 'Server'
          //     })
          //   })
          // }

          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }

          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
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
