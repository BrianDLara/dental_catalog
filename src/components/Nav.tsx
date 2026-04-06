import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import { Home, Settings, LogIn, Menu, X } from "lucide-react";

import logo from "../images/logo_2.png";

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogin = () => {
    setOpen(false);
    auth.signinRedirect({ state: { from: window.location.pathname } });
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between px-4 xl:px-10 h-16">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-10 xl:h-20 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-4">
          <NavButton
            icon={<Home size={18} />}
            label="Inicio"
            onClick={() => go("/")}
          />

          {auth.isAuthenticated && (
            <NavButton
              icon={<Settings size={18} />}
              label="Configuración"
              onClick={() => go("/settings")}
              variant="secondary"
            />
          )}

          {!auth.isAuthenticated && !auth.isLoading && (
            <NavButton
              icon={<LogIn size={18} />}
              label="Iniciar sesión"
              onClick={handleLogin}
              variant="outline"
            />
          )}
        </nav>

        {/* Mobile toggle */}
<button
  onClick={() => setOpen((v) => !v)}
  className="xl:hidden inline-flex items-center justify-center rounded-lg h-10 w-10 hover:bg-background transition cursor-pointer text-black hover:text-white"
  aria-label="Toggle menu"
>
  {open ? <X size={20} /> : <Menu size={20} />}
</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t bg-white text-black">
          <div className="flex flex-col gap-1 p-4">
            <MobileItem
              icon={<Home size={18} />}
              label="Inicio"
              onClick={() => go("/")}
            />

            {auth.isAuthenticated && (
              <MobileItem
                icon={<Settings size={18} />}
                label="Configuración"
                onClick={() => go("/settings")}
              />
            )}

            {!auth.isAuthenticated && !auth.isLoading && (
              <MobileItem
                icon={<LogIn size={18} />}
                label="Iniciar sesión"
                onClick={handleLogin}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;

/* ---------- helpers ---------- */

function NavButton({
  icon,
  label,
  onClick,
  variant = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-accent hover:bg-accent/80",
    outline:
      "border bg-background/80 hover:bg-accent transition backdrop-blur",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {icon}
      {label}
    </button>
  );
}

function MobileItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-background hover:text-white transition cursor-pointer"
      
    >
      {icon}
      {label}
    </button>
  );
}
