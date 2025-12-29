import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border/60">
      <div className="container mx-auto px-4 py-10">
        {/* Top */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              Guía Visual Dental
            </h3>

            <p className="text-muted-foreground max-w-md leading-relaxed">
              Esta herramienta es un apoyo visual para mejorar la comunicación
              entre dentista y paciente.
            </p>

            <p className="mt-10 text-md text-white">
              Conoce más de nuestros servicios en
            </p>

        <a
            href="https://sendadigitalmarketing.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="
                mt-3 inline-flex items-center gap-3 rounded-lg
                border border-border/60
                bg-card/20 px-3 py-2
                transition-all duration-300
                hover:bg-card/40
                hover:border-primary/50
                hover:-translate-y-0.5
                hover:shadow-lg
                group
            "
        >
            <img
                src="/images/logo_hero.png"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
                alt="Senda Digital Marketing Logo"
            />
            <span className="text-base font-semibold text-foreground">
                Senda Digital Marketing
                <span className="block text-xs font-normal text-muted-foreground">
                Página oficial
                </span>
            </span>
        </a>

          </div>

          {/* Right */}
          <div className="md:justify-self-end">
            <h4 className="text-sm font-semibold text-foreground/90 mb-3">
              Legal
            </h4>

            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/politica-privacidad"
                  className="hover:text-foreground hover:underline underline-offset-4 transition"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/terminos-condiciones"
                  className="hover:text-foreground hover:underline underline-offset-4 transition"
                >
                  Términos & Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-border/60" />

        {/* Bottom */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground/70">
          <span>
            © 2025{" "}
            <a
              href="https://sendadigitalmarketing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground hover:underline underline-offset-4 transition"
            >
              Senda Digital Marketing™
            </a>
            . All Rights Reserved.
          </span>

          <span className="text-muted-foreground/60">
            Guía Visual Dental • v1.0
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
