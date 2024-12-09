import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/@types/product.types'
import RatingStar from 'src/components/RatingStar/RatingStar'
import path from 'src/constants/path'
import { formatNumberSold, formatPrice } from 'src/utils/formatNumber'
import { generateNameId } from 'src/utils/utils'

interface ProductProps {
  product: ProductType
}

const Product = ({ product }: ProductProps) => {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.04rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img className='absolute top-0 left-0 bg-white w-full h-full object-cover' src={product.images[0]} alt='' />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray truncate'>
              đ{formatPrice(product.price_before_discount)}
            </div>
            <div className='text-orange truncate ml-1'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>{formatPrice(product.price)}</span>
            </div>
          </div>
        </div>
        <div className='mt-3 flex items-center justify-end'>
          <RatingStar rating={product.rating} />
          <div className='ml-2 text-sm'>
            <span>{formatNumberSold(product.sold)}</span>
            <span className='ml-1'>Đã bán</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
