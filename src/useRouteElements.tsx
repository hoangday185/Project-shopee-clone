import { lazy, Suspense, useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
// import Cart from './components/Cart';
import path from './constants/path';
import { AppContext } from './contexts/app.context';
import CartLayout from './layouts/CartLayout/CartLayout';
import MainLayout from './layouts/MainLayout';
import RegisterLayout from './layouts/RegisterLayout';
// import NotFound from './pages/NotFound';
// import ProductDetail from './pages/ProductDetail';
// import ProductList from './pages/ProductList';
// import Register from './pages/Register';
// import ChangePassword from './pages/User/ChangePassword/ChangePassword';
// import HistoryPurchase from './pages/User/HistoryPurchase';
import UserLayout from './pages/User/Layout/UserLayout';
// import Profile from './pages/User/Profile';

const Login = lazy(() => import('./pages/Login'));
const Cart = lazy(() => import('./components/Cart'));
const Register = lazy(() => import('./pages/Register'));
const ChangePassword = lazy(() => import('./pages/User/ChangePassword'));
const HistoryPurchase = lazy(() => import('./pages/User/HistoryPurchase'));
const Profile = lazy(() => import('./pages/User/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ProductList = lazy(() => import('./pages/ProductList'));

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          )
        }
      ]
    },

    //route này phải sắp xếp theo thứ tự, luôn check ở cái đầu tiên,để fix thì ta set index true là đc

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },

        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        }
      ]
    },

    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ]);
  return routeElements;
};

export default useRouteElements;
