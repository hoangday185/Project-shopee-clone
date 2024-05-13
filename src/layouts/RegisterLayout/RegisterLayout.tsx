import Footer from 'src/components/Footer'
import RegisterHeader from 'src/components/RegisterHeader'

type RegisterLayoutProps = {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: RegisterLayoutProps): JSX.Element => {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RegisterLayout
