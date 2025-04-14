import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import RegisterHeader from 'src/components/RegisterHeader';

type RegisterLayoutProps = {
  children?: React.ReactNode;
};

const RegisterLayoutInner = ({ children }: RegisterLayoutProps): JSX.Element => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};

const RegisterLayout = memo(RegisterLayoutInner);

export default RegisterLayout;
