import { range } from 'lodash';
import { useEffect, useState } from 'react';

interface Props {
  onChange?: (value: Date) => void;
  value?: Date;
  errorMessage?: string;
}

const DateSelect = ({ errorMessage, value, onChange }: Props) => {
  const [date, setDate] = useState({
    day: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueForm } = event.target;
    const newValue = {
      day: value?.getDate() || date.day,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,

      [name]: Number(valueForm)
    };
    setDate(newValue);

    onChange && onChange(new Date(newValue.year, newValue.month, newValue.day));
  };

  useEffect(() => {
    if (value) {
      setDate({
        day: value?.getDate() || 1,
        month: value?.getMonth() || 0,
        year: value?.getFullYear() || 1990
      });
    }
  }, [value]);

  return (
    <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
      <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày sinh :</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            name='day'
            className='h-10 w-[32%] border cursor-pointer border-black/10 rounded-sm px-3 hover:border-orange '
            onChange={handleChange}
            value={value?.getDate() || date.day}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name='month'
            onChange={handleChange}
            className='h-10 w-[32%] border cursor-pointer border-black/10 rounded-sm px-3 hover:border-orange '
            value={value?.getMonth() || date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            name='year'
            onChange={handleChange}
            className='h-10 w-[32%] border cursor-pointer border-black/10 rounded-sm px-3 hover:border-orange'
            value={value?.getFullYear() || date.year}
          >
            <option disabled>Năm</option>
            {range(1990, 2026).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  );
};

export default DateSelect;
