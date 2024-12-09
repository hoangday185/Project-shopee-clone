import { useMutation, useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Purchase, PurchaseStatus } from 'src/@types/purchase.types'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { formatPrice } from 'src/utils/formatNumber'
import { generateNameId } from 'src/utils/utils'
import QuantityController from '../QuantityController'
import Button from '../Button/Button'
import { useEffect, useState } from 'react'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'

interface ExtendedPurchaseList extends Purchase {
  disabled: boolean
  checked: boolean
}

const Cart = () => {
  const [extendedPurchaseList, setExtendedPurchaseList] = useState<ExtendedPurchaseList[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () =>
      purchaseApi.getPurchases({
        status: purchasesStatus.inCart as PurchaseStatus
      })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchaseList.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchaseList?.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalPurchasePrice = checkedPurchases.reduce((result, current) => {
    return result + current.price * current.buy_count
  }, 0)
  const totalCheckedPurchaseSavingPrice = checkedPurchases.reduce((result, current) => {
    return result + (current.price_before_discount - current.price) * current.buy_count
  }, 0)

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProduct,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  useEffect(() => {
    setExtendedPurchaseList((pre) => {
      const extendedPurchaseObject = keyBy(pre, '_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart]) //thêm 2 field cho cart để dễ quản lý và handle

  const handleCheck = (purchasesIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchaseList(
      produce((draft) => {
        draft[purchasesIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchaseList((pre) => pre.map((purchase) => ({ ...purchase, checked: !isAllChecked })))
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchaseList[purchaseIndex]
      setExtendedPurchaseList(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )

      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantiy = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchaseList(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchaseList[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchase = () => {
    const purchaseIdList = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIdList)
  }

  const handleBuyProduct = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))

      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            {extendedPurchaseList.length > 0 && (
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchaseList.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='grid items-center grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm mb-5 last:mb-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase.checked}
                            onChange={handleCheck(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                              className='h-20 w-20 flex-shrink-0'
                            >
                              <img src={purchase.product.image} alt={purchase.product.name} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                className='line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>đ{formatPrice(purchase.product.price)}</span>
                            <span className='ml-3'>đ{formatPrice(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center'
                            onType={handleTypeQuantiy(index)}
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            disabled={purchase.disabled}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>
                            đ{formatPrice(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='bg-none text-black transition-colors hover:text-orange'
                            onClick={handleDelete(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex flex-col sm:flex-row sm:items-center rounded-sm bg-white p-5 shadow border border-gray-100 mt-8'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bg-none'>Chọn tất cả ({checkedPurchasesCount})</button>
            <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchase}>
              Xóa
            </button>
          </div>

          <div className='sm:ml-auto flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-0'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán: </div>
                <div className='ml-2 text-2xl text-orange'>đ{formatPrice(totalPurchasePrice)}</div>
              </div>
              <div className='flex items-center sm:justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>đ{formatPrice(totalCheckedPurchaseSavingPrice)}</div>
              </div>
            </div>
            <Button
              className='sm:ml-4 mt-5 sm:mt-0 h-10 w-52 text-center uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center
             items-center'
              onClick={handleBuyProduct}
              disabled={buyProductMutation.isPending}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
