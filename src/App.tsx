import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { AppContext } from './contexts/app.context';
import useRouteElements from './useRouteElements';
import { localStorageEventTarget } from './utils/auth';

function App() {
  const routeElements = useRouteElements();
  const { handleExpireAccessToken } = useContext(AppContext);
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', handleExpireAccessToken);
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', handleExpireAccessToken);
    };
  }, [handleExpireAccessToken]);
  return (
    <>
      <div>{routeElements}</div>
      <ToastContainer />
    </>
  );
}

export default App;
