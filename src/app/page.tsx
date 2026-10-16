"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Code,
  Cpu,
  Globe,
  Layers,
  MessageCircle,
  Smartphone,
  Zap,
  X,
  ExternalLink,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowRight,
} from "lucide-react";
import HeroStudio3D from "@/components/HeroStudio3D";

// ── Project data with images ────────────────────────────────────────────
interface Project {
  id: number;
  title: string;
  subtitle: string;
  tag1: string;
  tag2: string;
  desc: string;
  longDesc: string;
  images: string[];
  tech: string[];
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Plataforma Comercial E-Commerce",
    subtitle: "Página Web, App Móvil e Intranet Comercial",
    tag1: "Web + Móvil",
    tag2: "Intranet & Pagos",
    desc: "Plataforma integral de comercio digital que combina sitio web de alta conversión, aplicación móvil y un sistema intranet con catálogo y cotizador en línea.",
    longDesc: "Desarrollamos una solución integral de comercio omnicanal que sincroniza página web de alto rendimiento, app móvil para clientes y una intranet administrativa con gestión de cotizaciones, pedidos, inventario en tiempo real y pasarelas de cobro seguras.",
    images: [
      "/cotizador/Inicio.png",
      "/cotizador/Nosotros.png",
      "/cotizador/Productos.png",
      "/cotizador/App movil.png",
    ],
    tech: ["Next.js", "React Native", "TypeScript", "Laravel", "PostgreSQL", "Pasarela de Pagos"],
    link: "https://ddsp.sanchezpharma.com/",
  },
  {
    id: 2,
    title: "LogiCore — Sistema de Logística y Transporte",
    subtitle: "Plataforma Integral para Drogueria Sánchez Pharma",
    tag1: "Laravel",
    tag2: "PHP",
    desc: "Sistema ERP a medida con gestión de pedidos, almacén, transporte, reportes avanzados y backups automáticos.",
    longDesc: "Desarrollamos LogiCore, una plataforma integral de logística y transporte para Drogueria Sánchez Pharma. Incluye módulos de Almacén, Pedidos, Post-Venta, Transporte, Cotizaciones, Ingresos, Reportes detallados (por pedido, cotización, ingresos, clientes, vendedores) y un sistema de Backups exclusivo para SUPERADMIN con historial completo de respaldos. Redujo el tiempo de gestión operativa en un 68% y centralizó todos los procesos en una sola plataforma.",
    images: ["/logicore-dashboard.png", "/logicore-reportes.png", "/logicore-backups.png"],
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "REST API"],
    link: "https://ddsp.sanchezpharma.com/",
  },
  {
    id: 3,
    title: "Red de Integridad Lambayeque",
    subtitle: "Portal Web Institucional, Observatorio Ciudadano e Intranet",
    tag1: "Portal Web",
    tag2: "Transparencia & Obras",
    desc: "Plataforma oficial multiactor orientada a la transparencia en obras públicas, veeduría ciudadana e integridad institucional.",
    longDesc: "Diseño y desarrollo de la plataforma web oficial para la Red de Integridad de Lambayeque (reddeintegridadlambayeque.org). Integra un portal informativo institucional con módulos de noticias, publicaciones y actividades; un Observatorio ciudadano para la fiscalización, monitoreo y veeduría de obras públicas con verificación de estándares de integridad; y una intranet segura para la gestión y articulación multiactor de los miembros de la red.",
    images: [
      "/red-integridad/RI_Inicio.png",
      "/red-integridad/RI_Obs.png",
      "/red-integridad/RI_Intranet.png",
    ],
    tech: ["Web Informativa", "Observatorio de Obras", "Intranet Multiactor", "Transparencia Pública", "Seguridad Web"],
    link: "https://www.reddeintegridadlambayeque.org/",
  },
  {
    id: 4,
    title: "Sistema de Gestión para Bodegas & Minimarkets",
    subtitle: "Punto de Venta (POS), Control de Inventario y Ventas",
    tag1: "Punto de Venta",
    tag2: "Gestión Comercial",
    desc: "Sistema a medida para bodegas y minimarkets con punto de venta ágil, registro de ventas, control de inventario y arqueo de caja.",
    longDesc: "Desarrollamos una plataforma integral de gestión comercial diseñada especialmente para bodegas, tiendas y minimarkets. Integra un Punto de Venta (POS) rápido y optimizado para mostrador, control de ventas en tiempo real, catálogo de productos con control de stock, historial detallado de transacciones, arqueo de caja y reportes de rendimiento operativo.",
    images: [
      "/bodega/B_Inicio.png",
      "/bodega/B_PuntoVenta.png",
      "/bodega/B_Ventas.png",
    ],
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "POS / Punto de Venta", "Control de Stock"],
  },
];

// ── Project Modal Component ──────────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
  isDark,
}: {
  project: Project;
  onClose: () => void;
  isDark: boolean;
}) {
  const [currentImg, setCurrentImg] = useState(0);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div
        className={`relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-[0_30px_80px_rgba(0,0,0,0.5)] animate-in slide-in transition-colors duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-slate-700/60 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 z-20 w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-lg ${
            isDark
              ? "bg-slate-800/90 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"
              : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header gradient band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-t-3xl" />

        <div className="p-7 md:p-10">
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full border text-xs font-bold ${
                isDark
                  ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}
            >
              {project.tag1}
            </span>
            <span
              className={`px-3 py-1 rounded-full border text-xs font-bold ${
                isDark
                  ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-400"
                  : "bg-indigo-50 border-indigo-200 text-indigo-700"
              }`}
            >
              {project.tag2}
            </span>
          </div>

          <h2
            className={`text-2xl md:text-4xl font-black mb-1 tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {project.title}
          </h2>
          <p
            className={`font-semibold text-sm md:text-base mb-6 ${
              isDark ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            {project.subtitle}
          </p>

          {/* Image Carousel */}
          <div
            className={`relative rounded-2xl overflow-hidden border mb-4 aspect-video flex items-center justify-center ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"
            }`}
          >
            <img
              src={project.images[currentImg]}
              alt={`${project.title} - imagen ${currentImg + 1}`}
              className="object-contain w-full h-full max-h-72 md:max-h-96 transition-all duration-300"
            />
            {project.images.length > 1 && (
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${
                      i === currentImg
                        ? "bg-cyan-400 border-cyan-400 scale-125"
                        : isDark
                        ? "bg-slate-600 border-slate-500 hover:bg-slate-400"
                        : "bg-slate-300 border-slate-400 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Prev / Next image buttons */}
          {project.images.length > 1 && (
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() =>
                  setCurrentImg((p) => (p - 1 + project.images.length) % project.images.length)
                }
                className={`px-4 py-1.5 rounded-full border text-xs font-bold transition ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                ← Anterior
              </button>
              <span className="text-slate-500 text-xs self-center">
                {currentImg + 1} / {project.images.length}
              </span>
              <button
                onClick={() => setCurrentImg((p) => (p + 1) % project.images.length)}
                className={`px-4 py-1.5 rounded-full border text-xs font-bold transition ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Siguiente →
              </button>
            </div>
          )}

          {/* Description */}
          <p
            className={`leading-relaxed mb-8 text-sm md:text-base ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {project.longDesc}
          </p>

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Tecnologías utilizadas
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-slate-300"
                      : "bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                Visitar Sitio Web
              </a>
            )}
            <a
              href={`https://wa.me/51964670996?text=Hola,%20me%20interesa%20un%20proyecto%20similar%20a:%20${encodeURIComponent(
                project.title
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Quiero algo similar
            </a>
            <button
              onClick={onClose}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
              }`}
            >
              <X className="w-4 h-4" /> Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────
export default function Home() {
  const whatsappNumber = "51964670996";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hola,%20me%20interesan%20los%20servicios%20de%20CAEC%20Software.`;

  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Restore saved theme on client load
  useEffect(() => {
    const saved = localStorage.getItem("caec_theme");
    if (saved === "light") {
      setIsDark(false);
    }
  }, []);

  // Close mobile menu on route change / outside click
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("caec_theme", next ? "dark" : "light");
      return next;
    });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#070d18] text-white selection:bg-blue-500/30" : "bg-[#f8fafc] text-slate-900 selection:bg-blue-500/20"
      }`}
    >
      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav
        className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-500 ${
          isDark
            ? "bg-[#091322]/92 border-white/10 shadow-2xl"
            : "bg-white/90 border-slate-200 shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + brand text */}
            <a href="#inicio" className="flex items-center gap-2.5 group flex-shrink-0" onClick={closeMobileMenu}>
              <div
                className={`h-10 w-10 md:h-12 md:w-12 rounded-xl p-1 border shadow-lg overflow-hidden transition-all ${
                  isDark
                    ? "bg-slate-900 border-white/15 group-hover:border-cyan-400/50"
                    : "bg-slate-50 border-slate-200 group-hover:border-blue-400/60"
                }`}
              >
                <img
                  src="/logo-app.png"
                  alt="CAEC App"
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className={`font-extrabold text-sm md:text-base tracking-wide transition-colors ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  CAEC
                </span>
                <span className="text-cyan-500 text-[9px] md:text-[10px] font-semibold">
                  Software &amp; Digital Solutions
                </span>
              </div>
            </a>

            {/* Nav links — desktop */}
            <div className="hidden md:flex items-center space-x-7 text-sm font-semibold">
              <a href="#inicio" className={`transition-colors ${isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-600 hover:text-blue-600"}`}>Inicio</a>
              <a href="#nosotros" className={`transition-colors ${isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-600 hover:text-blue-600"}`}>Quiénes Somos</a>
              <a href="#services" className={`transition-colors ${isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-600 hover:text-blue-600"}`}>Servicios</a>
              <a href="#projects" className={`transition-colors ${isDark ? "text-slate-300 hover:text-cyan-300" : "text-slate-600 hover:text-blue-600"}`}>Proyectos</a>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* THEME SWITCHER */}
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                title={isDark ? "Modo Claro" : "Modo Oscuro"}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 ${
                  isDark
                    ? "bg-slate-800/90 border-slate-700 text-amber-400 hover:bg-slate-700 hover:border-amber-400/40"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300"
                }`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* WhatsApp CTA — hidden on mobile, shown on sm+ */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-[0_0_18px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp
              </a>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label="Menú"
                className={`md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg border transition-all ${
                  isDark ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
                }`}
              >
                <span className={`block w-5 h-0.5 transition-all duration-300 ${
                  isDark ? "bg-slate-300" : "bg-slate-700"
                } ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`block w-5 h-0.5 my-1 transition-all duration-300 ${
                  isDark ? "bg-slate-300" : "bg-slate-700"
                } ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 transition-all duration-300 ${
                  isDark ? "bg-slate-300" : "bg-slate-700"
                } ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        } ${
          isDark ? "bg-[#091322]/98 border-white/10" : "bg-white/98 border-slate-200"
        } border-t`}>
          <div className="px-4 py-4 flex flex-col gap-1">
            {[
              { href: "#inicio", label: "Inicio" },
              { href: "#nosotros", label: "Quiénes Somos" },
              { href: "#services", label: "Servicios" },
              { href: "#projects", label: "Proyectos" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isDark
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="mt-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-5 py-3 rounded-xl text-sm font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO 3D ──────────────────────────────────────────────────────── */}
      <div id="inicio">
        <HeroStudio3D whatsappLink={whatsappLink} isDark={isDark} />
      </div>

      {/* ── QUIÉNES SOMOS ─────────────────────────────────────────────────── */}
      <section
        id="nosotros"
        className={`py-16 sm:py-24 md:py-28 relative overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#070e1b]" : "bg-slate-50"
        }`}
      >
        {/* Subtle, executive background lighting (clean & professional) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-0 right-1/4 w-[500px] h-[350px] rounded-full filter blur-[120px] opacity-10 ${
              isDark ? "bg-blue-600" : "bg-blue-300"
            }`}
          />
          <div
            className={`absolute bottom-0 left-1/4 w-[500px] h-[350px] rounded-full filter blur-[120px] opacity-10 ${
              isDark ? "bg-cyan-600" : "bg-cyan-300"
            }`}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top section heading */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Quiénes Somos
            </h2>
            <p
              className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Tecnología de alta gama concebida con rigor de ingeniería, diseño vanguardista y pasión por la transformación empresarial.
            </p>
          </div>

          {/* Executive Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Photo Card (Executive, High-End & Clean) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full">
                {/* Executive Card Container — Clean & Professional, no loud AI glow */}
                <div
                  className={`relative rounded-3xl p-3.5 sm:p-4 border transition-all duration-300 shadow-xl ${
                    isDark
                      ? "bg-slate-900/95 border-slate-800 shadow-slate-950/60"
                      : "bg-white border-slate-200/90 shadow-slate-200/60"
                  }`}
                >
                  {/* Photo frame */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/40">
                    <img
                      src="/mi-perfil.png"
                      alt="Líder de Arquitectura & Desarrollo de CAEC"
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    />

                    {/* Gradient bottom overlay for clean text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    {/* Status pill on photo — discreet & professional */}
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-medium text-emerald-400 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Disponible para Proyectos
                    </div>

                    {/* Leader title card overlay */}
                    <div className="absolute bottom-3.5 inset-x-3 text-center">
                      <p className="text-white font-bold text-sm sm:text-base tracking-wide drop-shadow-sm">
                        Líder de Arquitectura &amp; Desarrollo
                      </p>
                      <p className="text-cyan-400 font-medium text-xs mt-0.5">CAEC Software &amp; Digital Solutions</p>
                    </div>
                  </div>

                  {/* Badges bar */}
                  <div className="mt-3.5 px-1 pb-1 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                    {["Next.js", "Laravel", "React Native", "Three.js", "Cloud"].map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-colors ${
                          isDark
                            ? "bg-slate-800/70 border-slate-700/80 text-slate-300"
                            : "bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio Narrative & High-Impact Pillars */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div
                className={`p-8 md:p-10 rounded-3xl border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/60 border-slate-800"
                    : "bg-white/80 border-slate-200"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-4 uppercase tracking-wider">
                  ✦ Nuestra Filosofía de Trabajo
                </div>

                <h3
                  className={`text-2xl md:text-3xl font-black mb-4 tracking-tight leading-snug ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Impulsando el crecimiento digital con software robusto y diseño de primer nivel
                </h3>

                <p
                  className={`text-sm md:text-base leading-relaxed mb-6 font-light ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  En <strong className={isDark ? "text-cyan-300" : "text-blue-600"}>CAEC Software</strong> unimos ingeniería de precisión y creatividad interactiva. No hacemos sitios web genéricos: desarrollamos plataformas comerciales a medida, aplicaciones móviles escalables e intranets de gestión empresarial diseñadas para generar ingresos continuos y optimizar la operación de tu negocio.
                </p>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                      title: "Código Limpio & Seguro",
                      desc: "Arquitecturas probadas, sin dependencias innecesarias y con protección de datos.",
                    },
                    {
                      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
                      title: "Ecosistema Omnicanal",
                      desc: "Integración perfecta de Sitio Web, App Móvil e Intranet Comercial en tiempo real.",
                    },
                    {
                      icon: <Award className="w-5 h-5 text-blue-400" />,
                      title: "Garantía & Acompañamiento",
                      desc: "Soporte técnico directo, asesoría continua y capacitación post-entrega.",
                    },
                    {
                      icon: <Zap className="w-5 h-5 text-amber-400" />,
                      title: "Máxima Velocidad & SEO",
                      desc: "Tiempos de carga ultra rápidos optimizados para liderar en Google y redes.",
                    },
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        isDark
                          ? "bg-slate-950/40 border-slate-800/80 hover:border-cyan-500/40"
                          : "bg-slate-50 border-slate-200/80 hover:border-blue-400"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div
                          className={`p-2 rounded-xl border ${
                            isDark ? "bg-slate-900 border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          {p.icon}
                        </div>
                        <h4
                          className={`text-sm font-bold ${
                            isDark ? "text-slate-100" : "text-slate-900"
                          }`}
                        >
                          {p.title}
                        </h4>
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Direct CTA */}
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Hablemos de tu Proyecto
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#projects"
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all ${
                      isDark
                        ? "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    }`}
                  >
                    Ver Proyectos Realizados
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section
        id="services"
        className={`py-16 sm:py-24 md:py-28 relative transition-colors duration-500 ${
          isDark ? "bg-[#091120]" : "bg-[#f1f5f9]"
        }`}
      >
        <div
          className={`absolute top-0 inset-x-0 h-px ${
            isDark
              ? "bg-gradient-to-r from-transparent via-blue-500/25 to-transparent"
              : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          }`}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div
              className={`inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                isDark
                  ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                  : "border-blue-300 bg-blue-50 text-blue-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Excelencia en cada entrega
            </div>
            <h2
              className={`text-4xl md:text-5xl font-black mb-5 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Servicios Especializados
            </h2>
            <p
              className={`text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Construimos la infraestructura tecnológica que tu empresa necesita para destacar y convertir visitantes en clientes de alto valor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="text-blue-500" size={28} />,
                title: "Landing Pages Premium",
                desc: "Páginas de ultra alta conversión con interactividad 3D, velocidad instantánea y optimización SEO.",
              },
              {
                icon: <Smartphone className="text-cyan-500" size={28} />,
                title: "Apps Móviles & Web",
                desc: "Aplicaciones fluidas para iOS y Android con UX impecable y arquitectura escalable.",
              },
              {
                icon: <Code className="text-indigo-500" size={28} />,
                title: "Software a Medida",
                desc: "Automatización de procesos empresariales y plataformas corporativas diseñadas para tu negocio.",
              },
              {
                icon: <Cpu className="text-blue-500" size={28} />,
                title: "Integración de Sistemas",
                desc: "Conexión de pasarelas de pago, CRMs, APIs para un flujo de trabajo 100% automatizado.",
              },
              {
                icon: <Layers className="text-cyan-500" size={28} />,
                title: "Diseño UI / UX Exclusivo",
                desc: "Interfaces limpias, profesionales y de alto impacto diseñadas para cautivar a primera vista.",
              },
              {
                icon: <Zap className="text-indigo-500" size={28} />,
                title: "Transformación Digital",
                desc: "Estrategias para digitalizar tu negocio, multiplicar ventas y superar a la competencia.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border transition-all duration-300 group hover:-translate-y-1 shadow-xl backdrop-blur-sm ${
                  isDark
                    ? "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/50 hover:border-blue-500/40"
                    : "bg-white border-slate-200/90 hover:bg-slate-50 hover:border-blue-400 text-slate-900"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 ${
                    isDark
                      ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-white/10"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  {s.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-slate-100" : "text-slate-900"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`leading-relaxed font-light text-sm ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section
        id="projects"
        className={`py-16 sm:py-24 md:py-28 relative transition-colors duration-500 ${
          isDark ? "bg-[#070d18]" : "bg-[#f8fafc]"
        }`}
      >
        <div className="absolute inset-0 bg-blue-900/5 blur-[150px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
            <div
              className={`inline-flex items-center gap-2 mb-3.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                isDark
                  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                  : "border-blue-200 bg-blue-50 text-blue-700"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Proyectos en Producción
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Casos Reales de Éxito
            </h2>
            <p
              className={`text-sm sm:text-base md:text-lg font-light leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Plataformas comerciales y sistemas corporativos concebidos a medida. Haz clic en cualquiera para explorar su arquitectura, interfaz y módulos.
            </p>
          </div>

          {/* Large, high-impact 2-column showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setOpenProject(project)}
                className={`group cursor-pointer text-left relative rounded-[2rem] border overflow-hidden transition-all duration-500 shadow-xl hover:-translate-y-1.5 flex flex-col ${
                  isDark
                    ? "bg-slate-900/80 border-slate-800/90 hover:border-cyan-500/50 hover:shadow-[0_24px_60px_rgba(6,182,212,0.12)]"
                    : "bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-[0_24px_60px_rgba(59,130,246,0.14)] text-slate-900"
                }`}
              >
                {/* Browser / Studio Mockup Frame */}
                <div
                  className={`relative p-3.5 sm:p-5 border-b transition-colors ${
                    isDark ? "bg-slate-950/70 border-slate-800/80" : "bg-slate-100/70 border-slate-200/80"
                  }`}
                >
                  {/* Window bar */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                      <span className={`ml-2 text-[11px] font-mono font-medium truncate max-w-[170px] sm:max-w-xs ${
                        isDark ? "text-slate-500" : "text-slate-400"
                      }`}>
                        {project.link ? project.link.replace("https://", "") : `${project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.caec.app`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.link ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          En Vivo
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isDark ? "bg-slate-800/80 border-slate-700 text-slate-400" : "bg-slate-200 border-slate-300 text-slate-600"
                        }`}>
                          Software ERP
                        </span>
                      )}
                      <span className="font-mono text-xs font-bold text-slate-500/70 ml-1">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* High Definition Project Showcase Image */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-black/10 shadow-inner">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Subtle atmospheric vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                    {/* Interactive hover overlay button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] bg-slate-950/30">
                      <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/90 text-white font-bold text-xs sm:text-sm shadow-2xl border border-cyan-400/40 transform group-hover:scale-105 transition-transform duration-300">
                        <ExternalLink className="w-4 h-4 text-cyan-400" />
                        Ver Pantallas &amp; Módulos
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                          isDark
                            ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                            : "bg-blue-50 border-blue-200 text-blue-700"
                        }`}
                      >
                        {project.tag1}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                          isDark
                            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                            : "bg-indigo-50 border-indigo-200 text-indigo-700"
                        }`}
                      >
                        {project.tag2}
                      </span>
                      <span
                        className={`text-xs ml-auto font-medium ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {project.images.length} pantallas
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3
                      className={`text-xl sm:text-2xl font-black mb-1.5 tracking-tight transition-colors ${
                        isDark
                          ? "text-white group-hover:text-cyan-300"
                          : "text-slate-900 group-hover:text-blue-600"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-semibold mb-3 ${
                        isDark ? "text-cyan-400" : "text-blue-600"
                      }`}
                    >
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p
                      className={`text-sm sm:text-base font-light leading-relaxed mb-6 line-clamp-3 ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech stack chips & action footer */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${
                            isDark
                              ? "bg-slate-950/50 border-slate-800 text-slate-400"
                              : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            isDark ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          +{project.tech.length - 4} más
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-transform group-hover:translate-x-1 ${
                          isDark ? "text-cyan-400" : "text-blue-600"
                        }`}
                      >
                        Explorar Caso de Estudio
                        <ArrowRight className="w-4 h-4" />
                      </span>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            isDark
                              ? "bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                          }`}
                        >
                          Visitar Web
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA WHATSAPP ─────────────────────────────────────────────────── */}
      <section
        className={`py-16 sm:py-24 md:py-28 relative overflow-hidden transition-colors duration-500 ${
          isDark ? "bg-[#070d18]" : "bg-[#f8fafc]"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            className={`relative rounded-3xl p-7 sm:p-10 md:p-16 text-center overflow-hidden transition-all duration-300 shadow-2xl ${
              isDark
                ? "bg-[#0e182a] border border-slate-700/60"
                : "bg-white border border-slate-200"
            }`}
          >
            {/* Subtle Texture / Gradient (Professional, not AI) */}
            <div
              className={`absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none ${
                isDark
                  ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700/40 via-transparent to-transparent"
                  : "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-200/50 via-transparent to-transparent"
              }`}
            />
            
            <div className="relative z-10">
              <h2
                className={`text-3xl md:text-5xl font-black mb-5 tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                ¿Listo para iniciar tu proyecto?
              </h2>
              
              <p
                className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Escríbenos por WhatsApp y nuestro equipo preparará una propuesta técnica y comercial a la medida de tu empresa.
              </p>

              <div className="flex justify-center">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full text-base font-bold transition-transform transform hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(37,211,102,0.4)]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Hablar por WhatsApp Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className={`border-t transition-colors duration-500 ${
          isDark ? "border-slate-800/60 bg-[#070d18] text-white" : "border-slate-200 bg-slate-900 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="relative inline-block w-fit">
                <img
                  src="/logo-general.png"
                  alt="CAEC Software & Digital Solutions"
                  className="h-20 md:h-24 w-auto object-contain mix-blend-screen select-none"
                  style={{
                    WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, black 25%, transparent 80%)",
                    maskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, black 25%, transparent 80%)",
                  }}
                />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Transformamos ideas en soluciones digitales de alto impacto. Desarrollo web, apps y software a medida.
              </p>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Navegación
              </p>
              <a href="#inicio" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
                Inicio
              </a>
              <a href="#nosotros" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
                Quiénes Somos
              </a>
              <a href="#services" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
                Servicios
              </a>
              <a href="#projects" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
                Proyectos
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-300 text-sm transition-colors"
              >
                Contáctanos
              </a>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Síguenos
              </p>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61594429635549"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all hover:scale-110 shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all hover:scale-110 shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all hover:scale-110 shadow-md"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
              <p className="text-slate-500 text-xs">¿Tienes un proyecto? ¡Escríbenos hoy!</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800/50 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} CAEC Software &amp; Digital Solutions. Todos los derechos reservados.
            </p>
            <span className="text-slate-500 text-xs">Hecho por CAEC</span>
          </div>
        </div>
      </footer>

      {/* ── PROJECT MODAL ─────────────────────────────────────────────────── */}
      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={() => setOpenProject(null)}
          isDark={isDark}
        />
      )}
    </main>
  );
}
