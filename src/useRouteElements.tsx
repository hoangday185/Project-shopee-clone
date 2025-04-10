import { useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import Cart from './components/Cart';
import path from './constants/path';
import { AppContext } from './contexts/app.context';
import CartLayout from './layouts/CartLayout/CartLayout';
import MainLayout from './layouts/MainLayout';
import RegisterLayout from './layouts/RegisterLayout';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import ChangePassword from './pages/User/ChangePassword/ChangePassword';
import HistoryPurchase from './pages/User/HistoryPurchase';
import UserLayout from './pages/User/Layout/UserLayout';
import Profile from './pages/User/Profile';

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
    //route này phải sắp xếp theo thứ tự, luôn check ở cái đầu tiên,để fix thì ta set index true là đc
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },

        {
          path: '',
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
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
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ]);
  return routeElements;
};

export default useRouteElements;
