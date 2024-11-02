import { createContext, useContext, useState } from 'react';
import ErrorBoundary from '../ErrorBundary/ErrorBundary';


const ErrorContext = createContext();

// Custom hook to access the global error context
export const useGlobalError = () => useContext(ErrorContext);

export default function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err);
    console.error("Global Error:", err); // Log the error for debugging or monitoring
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </ErrorContext.Provider>
  );
}
