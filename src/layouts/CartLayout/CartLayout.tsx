import CartHeader from 'src/components/CartHeader';
import Footer from 'src/components/Footer';

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  );
};

export default CartLayout;
