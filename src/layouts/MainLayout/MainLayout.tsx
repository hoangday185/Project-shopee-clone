import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

type MainLayoutProps = {
  children?: React.ReactNode;
};
const MainLayoutInner = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  );
};

const MainLayout = memo(MainLayoutInner);

export default MainLayout;
