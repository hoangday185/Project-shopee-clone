import { Link } from 'react-router-dom';
import path from 'src/constants/path';

const UserSideNav = () => {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-black'>
          <img
            src='https://avatars.githubusercontent.com/u/108289635?v=4'
            alt=''
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>hoangday185</div>
          <Link to={path.profile} className='flex items-center capitalize '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors '>
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' className='h-full w-full' alt='' />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.profile} className='mt-4 flex items-center capitalize text-gray-600 transition-colors '>
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' className='h-full w-full' alt='' />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.profile} className='mt-4 flex items-center capitalize text-gray-600 transition-colors '>
          <div className='h-[22px] w-[22px] mr-3'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' className='h-full w-full' alt='' />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  );
};

export default UserSideNav;
