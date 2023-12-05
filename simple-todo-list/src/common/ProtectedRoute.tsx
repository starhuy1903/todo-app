import { useAppContext } from "../context/app.tsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAppContext();

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
