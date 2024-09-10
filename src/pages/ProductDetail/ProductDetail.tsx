import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import RatingStar from 'src/components/RatingStar/RatingStar'
import { formatNumberSold, formatPrice } from 'src/utils/formatNumber'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { generateIdFormNameId, rateSale } from 'src/utils/utils'
import { ProductListConfig } from 'src/@types/product.types'
import useQueryConfig from 'src/hooks/useQueryConfig'
import Product from '../ProductList/Component/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseApi from 'src/apis/purchase.api'
import { queryClient } from 'src/main'
import { purchaseStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { nameId } = useParams()
  const queryConfig = useQueryConfig()
  const id = generateIdFormNameId(nameId as string)
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const imageRef = useRef<HTMLImageElement>(null)
  //tạo current index image để set active cho ảnh và lấy ra 5 ảnh đầu tiên
  const [currentIndexImage, setCurrentIndexImage] = useState<[number, number]>([
    0, 5
  ])
  const [imageActive, setImageActive] = useState<string>('')
  const [buyCount, setBuyCount] = useState<number>(1)

  const product = data?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )

  useEffect(() => {
    if (product && product.images.length > 0) {
      //khi có data thì check thêm list ảnh có rỗng không thỏa 2 điều trên thì set vào useState
      setImageActive(product.images[0])
    }
  }, [product])

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) =>
      purchaseApi.addToCart(body)
  })

  const onChooseImage = (image: string) => {
    setImageActive(image)
  }

  const nextImage = () => {
    if (product && product.images.length > currentIndexImage[1]) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevImage = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect() //lấy ra chiều cao chiều rộng của thẻ div
    const image = imageRef.current as HTMLImageElement // lấy element ra như dom trong js thuần
    const { naturalHeight, naturalWidth } = image //lấy ra đúng with và height của image

    //set lại with height của image
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset' //loại bỏ max width
    // lấy ra vị trí của của con trỏ chuột trong element
    const { offsetX, offsetY } = event.nativeEvent //cách 1 cần xử lý event bubble
    //cách 2 ko cần xử lý event bubble
    // const offsetX = event.pageX - (rect.x + window.scrollX)
    // const offsetY = event.pageY - (rect.y + window.scrollY)

    //tính top và left
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    // console.log('offset', offsetX, offsetY)
    // console.log('position', top, left)
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(data)
  })

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      {
        product_id: product?._id as string,
        buy_count: buyCount
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({
            queryKey: ['purchases', purchaseStatus.inCart]
          })
        }
      }
    )
  }

  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full pt-[100%] shadow overflow-hidden  cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  className='absolute top-0 left-0 bg-white w-full h-full object-cover pointer-events-none' //pointer events none ngăn chặn event pointer
                  src={product.images[0]}
                  alt={product.name}
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 w-5 h-9 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prevImage}
                >
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
                {currentImages.map((image) => {
                  const isActive = imageActive === image
                  return (
                    <div
                      className='relative w-full pt-[100%]'
                      key={image}
                      onMouseEnter={() => onChooseImage(image)}
                    >
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
                <button
                  className='absolute right-0 top-1/2 z-10 w-5 h-9 -translate-y-1/2 bg-black/20 text-white'
                  onClick={nextImage}
                >
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
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
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
              <div className='mt-8 flex items-center gap-1'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  max={product.quantity}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>
                  {product.quantity} sản phẩm có sẵn
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange hover:bg-orange/5'
                  onClick={addToCart}
                >
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
      <div className='container'>
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

      <div className='mt-8 container'>
        <div className='uppercase'>Có thể bạn cũng thích</div>
        <div className='mt-6 grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3'>
          {productData &&
            productData.data.data.products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
