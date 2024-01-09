import  { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      // You can log the error to an error reporting service here
      console.error(error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    // You can render any custom fallback UI here
    return <div>Something went wrong.</div>;
  }

  return children;
};

export default ErrorBoundary;
