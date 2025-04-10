import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { createSearchParams, Link } from 'react-router-dom';
import { PurchaseListStatus, PurchaseStatus } from 'src/@types/purchase.types';
import purchaseApi from 'src/apis/purchase.api';
import path from 'src/constants/path';
import { purchasesStatus } from 'src/constants/purchase';
import useQueryParams from 'src/hooks/useQueryParams';
import { formatPrice } from 'src/utils/formatNumber';
import { generateNameId } from 'src/utils/utils';

const purchaseTab = [
  { status: purchasesStatus.all, label: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, label: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, label: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, label: 'Đang giao hàng' },
  { status: purchasesStatus.delivered, label: 'Đã giao hàng' },
  { status: purchasesStatus.cancelled, label: 'Đã hủy' }
];

const HistoryPurchase = () => {
  //get query status form url
  const queryParams = useQueryParams();
  const status = Number(queryParams.status) || purchasesStatus.all;
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: status as PurchaseListStatus }],
    queryFn: () =>
      purchaseApi.getPurchases({
        status: purchasesStatus.inCart as PurchaseStatus
      })
  });

  const purchaseInCart = purchasesInCartData?.data.data;

  const purchaseTabLink = purchaseTab.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': tab.status == status,
        'border-b-black/10 text-gray-900': tab.status != status
      })}
    >
      {tab.label}
    </Link>
  ));

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabLink}</div>
          <div>
            {purchaseInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 shadow-sm text-gray-800'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img src={purchase.product.image} alt={purchase.product.name} className='h-20 w-20 object-cover' />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      đ{formatPrice(purchase.product.price_before_discount)}
                    </span>
                    <span className='truncate text-orange text-xl ml-2'>{formatPrice(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='truncate text-orange text-xl  ml-2'>
                      đ{formatPrice(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPurchase;
