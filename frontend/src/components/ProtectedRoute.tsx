import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ProtectedRoute = () => {
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited') === 'true';
    
    if (location.pathname === '/welcome') {
      // If we're on the welcome page, no need to redirect
      setShouldRedirect(null);
      return;
    }
    
    if (!hasVisited) {
      // First visit - set the flag and redirect to welcome
      localStorage.setItem('hasVisited', 'true');
      setShouldRedirect('/welcome');
    } else if (location.pathname === '/') {
      // Already visited and at root - go to dashboard
      setShouldRedirect('/dashboard');
    }
  }, [location.pathname]);

  if (shouldRedirect) {
    return <Navigate to={shouldRedirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
