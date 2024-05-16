import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

type MainLayoutProps = {
  children?: React.ReactNode
}
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
