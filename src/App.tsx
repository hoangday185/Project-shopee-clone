import { ToastContainer } from 'react-toastify'
import './App.css'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

function App() {
  const routeElements = useRouteElements()
  const { handleExpireAccessToken } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', handleExpireAccessToken)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', handleExpireAccessToken)
    }
  }, [handleExpireAccessToken])
  return (
    <>
      <div>{routeElements}</div>
      <ToastContainer />
    </>
  )
}

export default App
