import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import RatingStarts from '../RatingStarts'
import RatingStar from 'src/components/RatingStar/RatingStar'
import { formatNumberSold, formatPrice } from 'src/utils/formatNumber'
import { rateSale } from 'src/utils/utils'
import InputNumber from 'src/components/InputNumber'
import DOMPurify from 'dompurify'

const ProductDetail = () => {
  const { id } = useParams()
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = data?.data.data
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button className='absolute left-0 top-1/2 z-10 w-5 h-9 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5 8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
                {product.images.slice(0, 5).map((image, index) => {
                  const isActive = index === 0
                  return (
                    <div className='relative w-full pt-[100%]' key={image}>
                      <img
                        className='absolute top-0 left-0 bg-white w-full h-full object-cover'
                        src={image}
                        alt={product.name}
                      />
                      {isActive && (
                        <div className='absolute inset-0 border-2 border-orange'></div>
                      )}
                    </div>
                  )
                })}
                <button className='absolute right-0 top-1/2 z-10 w-5 h-9 -translate-y-1/2 bg-black/20 text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m8.25 4.5 7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>
                    {product.rating}
                  </span>
                  <RatingStar
                    rating={Number(product.rating)}
                    activeClassName='fill-orange text-orange h-4 w-4'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberSold(product.sold)}</span>
                  <span className='ml-2 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  đ{formatPrice(product.price_before_discount)}
                </div>
                <div className='ml-3 text-3xl text-orange font-medium'>
                  đ{formatPrice(product.price)}
                </div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-sm font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                  giá
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M5 12h14'
                      />
                    </svg>
                  </button>
                  <InputNumber
                    value={1}
                    classNameError='hidden'
                    classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 4.5v15m7.5-7.5h-15'
                      />
                    </svg>
                  </button>
                </div>
                <div className='ml-6 text-sm text-gray-500'>
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange hover:bg-orange/5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-5 mr-[10px] stroke-orange text-orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>
          Mô tả sản phẩm
        </div>
        <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description) //loại bỏ javascript khỏi đây
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
