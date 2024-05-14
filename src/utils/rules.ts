import { UseFormGetValues, type RegisterOptions } from 'react-hook-form'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng '
    },
    maxLength: {
      value: 160,
      message: 'Độ dài email phải từ 5 đến 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài email phải từ 5 đến 160 ký tự'
    }
  }, //react hook form tự override lại name của tag input do khi chạy register
  //nó sẽ trả và 1 field name tương tự
  password: {
    required: { value: true, message: 'Password là bắt buộc' },
    maxLength: {
      value: 160,
      message: 'Độ dài password phải từ 6 đến 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài password phải từ 6 đến 160 ký tự'
    }
  },
  confirm_password: {
    required: { value: true, message: 'nhập lại password là bắt buộc' },
    maxLength: {
      value: 160,
      message: 'Độ dài confirm password phải từ 6 đến 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài confirm password phải từ 6 đến 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) =>
            value === getValues('password') || 'Password nhập lại không đúng'
        : undefined
  }
})
