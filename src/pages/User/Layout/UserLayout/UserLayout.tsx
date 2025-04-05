import { Outlet } from 'react-router-dom';
import UserSideNav from '../../Components/UserSideNav';

const UserLayout = () => {
  return (
    <div>
      <UserSideNav />
      <Outlet />
    </div>
  );
};

export default UserLayout;
