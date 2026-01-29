import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";


import { DebugClaims } from "../auth/DebugClaims";




const COGNITO_DOMAIN =
  "https://us-east-1q3u4ykfue.auth.us-east-1.amazoncognito.com";

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleGoHome = () => {
    navigate("/");
    setOpen(false);
  };

  const handleLogin = () => {
    setOpen(false);
    auth.signinRedirect({ state: { from: window.location.pathname } });
  };

  const handleLogout = async () => {
    // Close menu immediately for better UX
    setOpen(false);

    // 1) Clear local tokens/session stored by react-oidc-context
    await auth.removeUser();

    // 2) Clear Cognito Hosted UI session
    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string | undefined;
    if (!clientId) {
      console.error("Missing VITE_COGNITO_CLIENT_ID in env.");
      // Even if missing, user is logged out locally already
      return;
    }

    const logoutUri = window.location.origin + "/";

    window.location.href =
      `${COGNITO_DOMAIN}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
        logoutUri
      )}`;
  };

  return (
    <div className="relative items-center pb-2">
      {/* Top: Logo + Burger (mobile) */}
      <div className="flex items-center justify-between px-4 xl:px-10 pt-4 xl:hidden">
        <div className="z-10">
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src="/images/logo_2.png"
              alt="Logo"
              className="h-14 xl:h-26 w-auto"
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-2xl"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <FaTimes size="1.7rem" className="text-black" />
          ) : (
            <FaBars size="1.7rem" className="text-black" />
          )}
        </button>
      </div>

      {/* Desktop logo */}
      <div className="absolute left-4 xl:left-10 ml-2 xl:ml-4 z-10 hidden xl:block">
        <Link to="/">
          <img
            src="/images/logo_2.png"
            alt="Logo"
            className="h-14 xl:h-26 w-auto"
          />
        </Link>
      </div>

      {/* Navbar Links */}
      <div className="text-center pt-0 xl:pt-2 navbar-shadow">
        <div className="mt-4 flex flex-col sm:flex-row xl:justify-end xl:items-center text-center">
          <div className="w-full xl:w-1/3 space-y-4 xl:space-y-0 xl:space-x-6 text-center justify-center">
            <div
              className={`flex flex-col xl:flex-row gap-3 xl:justify-center items-center ${
                open ? "flex" : "hidden"
              } xl:flex`}
            >
              {/* Home */}
              <button
                type="button"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                onClick={handleGoHome}
              >
                Página Principal
              </button>

              {/* Login / Logout */}
              {!auth.isAuthenticated && !auth.isLoading && (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition"
                >
                  Iniciar sesión
                </button>
              )}

              {auth.isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-destructive/10 hover:text-destructive transition"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative items-center pb-2">
    {/* existing nav code */}

    {/* 🔎 TEMP DEBUG – REMOVE AFTER */}
    {import.meta.env.DEV && <DebugClaims />}
  </div>
    </div>



  );
};

export default Nav;
