import {
  Link,
  Navigate,
  createSearchParams,
  useNavigate
} from 'react-router-dom'
import Button from 'src/components/Button/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { QueryConfig } from '../ProductList'
import { Category } from 'src/@types/category.types'
import classNames from 'classnames'
import RatingStarts from 'src/pages/RatingStarts'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

const AsideFilter = ({ queryConfig, categories }: Props) => {
  const navigate = useNavigate()
  const { category } = queryConfig
  console.log(categories)

  const handleRemoveAll = () => [
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(queryConfig, [
          'rating_filter',
          'price_max',
          'price_min',
          'category'
        ])
      ).toString()
    })
  ]
  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg
                    viewBox='0 0 4 7'
                    className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link
        to={path.home}
        className='flex items-center font-bold mt-4 uppercase'
      >
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <form className='mt-2'>
          <div className='flex items-start'>
            <Input
              placeholder='đ TỪ'
              type='text'
              className='grow'
              name='from'
              classNameInput='p-1 text-sm w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              placeholder='đ ĐẾN'
              type='text'
              className='grow'
              name='from'
              classNameInput='p-1 text-sm w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <Button className='w-full p-2 uppercase bg-orange text-white hover:bg-orange/80 flex justify-center items-center'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStarts queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='w-full p-2 uppercase bg-orange text-white  hover:bg-orange/80 flex justify-center items-center'
        onClick={handleRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
