import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wasabi-500 to-wasabi-700 flex flex-col items-center justify-center p-6 text-center text-white">
      <h1 className="text-5xl font-bold mb-6 animate-fade-in">Welcome to SupplySight</h1>
      <p className="text-xl mb-8 animate-fade-in-up delay-100">Your intelligent inventory management solution</p>
      <div className="animate-bounce mt-8">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
      <p className="mt-8 text-wasabi-100 animate-pulse">
        Redirecting to dashboard in <span className="text-2xl font-bold text-white">{countdown}</span>...
      </p>
    </div>
  );
};

export default Welcome;