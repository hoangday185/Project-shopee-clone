import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { AppContext, AppProvider } from './contexts/app.context';
import useRouteElements from './useRouteElements';
import { localStorageEventTarget } from './utils/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

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
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ToastContainer />
          <ErrorBoundary>
            {routeElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
