import React from 'react';

interface ErrorMessageProps {
  error: Error;
  onRetry: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg 
            className="h-5 w-5 text-red-500" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {error.message || 'An error occurred while fetching data.'}
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={onRetry}
              className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;