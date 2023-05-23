import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isLoggedIn: Boolean;
  children: React.ReactNode;
}

function ProtectedRoute ({ isLoggedIn, children }: ProtectedRouteProps) : JSX.Element {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;