import { InputHTMLAttributes, useState } from 'react'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form'

export type InputNumberProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
} & InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<TFieldValues, TName>

const InputV2 = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: InputNumberProps<TFieldValues, TName>
): JSX.Element => {
  const {
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm foucs:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange,
    value = '',
    type,
    control,
    ...rest
  } = props
  const { field, fieldState } = useController({ ...props, control })
  const [localValue, setLocalValue] = useState<string>(field.value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition =
      type === 'number' &&
      (/^\d+$/.test(valueFromInput) || valueFromInput === '') //check xem có nhập vào number ko
    //type khác number ko cho nhập luôn
    if (numberCondition || type !== 'number') {
      //ko có onchange thì vẫn set lại giá trị cho localValue thì component vẫn re-render
      setLocalValue(valueFromInput)
      //gọi field.onChange để cập nhật lại state vào react-hook-form
      field.onChange(event)
      //thực thi onchange callback từ bên ngoài trền vào props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        {...rest}
        {...field}
        onChange={handleChange}
        value={value || localValue}
      />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
//    "react-hook-form": "^7.51.4",
