import React from 'react';
import { Link } from 'react-router-dom';
import path from 'src/constants/path';

interface Props {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<Props, { hasError: boolean; error: Error | null }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
          <div className='text-center'>
            <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
              Something went wrong
            </h1>

            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to={path.home}
                className='rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange/75'
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
