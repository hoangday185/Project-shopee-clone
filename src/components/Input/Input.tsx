import React from 'react'
import { RegisterOptions, type UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

const Input = ({
  type,
  errorMessage,
  name,
  placeholder,
  className,
  register,
  rules,
  autoComplete
}: InputProps): JSX.Element => {
  return (
    <div className={className}>
      <input
        type={type}
        autoComplete={autoComplete}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)} //react hook form tự override lại name của tag input do khi chạy register
        //nó sẽ trả và 1 field name tương tự
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>
        {errorMessage}
      </div>
    </div>
  )
}

export default Input
