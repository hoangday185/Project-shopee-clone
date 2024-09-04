import { InputHTMLAttributes, forwardRef } from 'react'

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumberInner(
    {
      errorMessage,
      className,
      classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm',
      classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
      onChange,
      ...rest
    },
    ref
  ): JSX.Element {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if ((/^\d+$/.test(value) || value === '') && onChange) {
        onChange(event)
      }
    }
    return (
      <div className={className}>
        <input
          className={classNameInput}
          {...rest}
          onChange={handleChange}
          ref={ref}
        />
        <div className={classNameError}>{errorMessage}</div>
      </div>
    )
  }
)
export default InputNumber
