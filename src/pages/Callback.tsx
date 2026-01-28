import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate("/");
  }, [auth.isAuthenticated, navigate]);

  if (auth.isLoading) return <div className="p-6">Signing you in...</div>;
  if (auth.error) return <div className="p-6">Error: {auth.error.message}</div>;

  return <div className="p-6">Finishing sign-in...</div>;
}
