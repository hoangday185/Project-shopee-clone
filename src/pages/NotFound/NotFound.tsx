import { Link } from 'react-router-dom';
import path from 'src/constants/path';

const NotFound = () => {
  return (
    <>
      <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-base font-semibold text-orange/90 '>404</p>
          <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
            Page not found
          </h1>
          <p className='mt-6 text-pretty text-lg font-medium text-black sm:text-xl/8'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              to={path.home}
              className='rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange/75'
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
