import { UseFormGetValues, type RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions
}

type FormValues = {
  email: string
  password: string
  confirm_password: string
}

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as {
    price_min: string
    price_max: string
  }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) > Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const getRules = (getValues?: UseFormGetValues<FormValues>): Rules => ({
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
  //nó sẽ trả và 1 field name tương tựs
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

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài email phải từ 5 đến 160 ký tự')
    .max(160, 'Độ dài email phải từ 5 đến 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(5, 'Độ dài password phải từ 6 đến 160 ký tự')
    .max(160, 'Độ dài password phải từ 6 đến 160 ký tự'),
  confirm_password: yup
    .string()
    .required('nhập lại password là bắt buộc')
    .min(5, 'Độ dài confirm password phải từ 6 đến 160 ký tự')
    .max(160, 'Độ dài confirm password phải từ 6 đến 160 ký tự')
    .oneOf([yup.ref('password')], 'Password nhập lại không đúng'), //yup.ref giúp tham chiếu đến 1 field nào đó
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export const loginSchema = schema.omit(['confirm_password']) //loại bỏ 1 field nào đó

export type LoginSchema = yup.InferType<typeof loginSchema>

export type Schema = yup.InferType<typeof schema>
