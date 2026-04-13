"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, User, Settings, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authServices";
import type { User as AuthUser } from "@/types/auth";

const Breadcrumb = ({ path }: { path: string }) => {
  const segments = path.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-2 font-sans text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
      {segments.map((segment, index) => (
        <React.Fragment key={`${segment}-${index}`}>
          <ChevronRight size={10} className="text-slate-800" />
          <span
            className={cn(
              "transition-colors",
              index === segments.length - 1 ? "text-blue-500" : "text-slate-400"
            )}
          >
            {segment.replace(/-/g, " ")}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState<AuthUser | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rawUser = window.localStorage.getItem("auth_user");

    if (!rawUser) {
      setSessionUser(null);
      return;
    }

    try {
      setSessionUser(JSON.parse(rawUser) as AuthUser);
    } catch {
      setSessionUser(null);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!profileRef.current) {
        return;
      }

      if (!profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = async () => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("auth_token") : null;

    try {
      if (token) {
        await authService.logout(token);
      }
    } catch (error) {
      console.error("Error al cerrar sesion:", error);
    } finally {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("auth_token");
        window.localStorage.removeItem("auth_user");
      }

      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-700/40 bg-[#0d1524]/72 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Breadcrumb path={pathname || "/dashboard"} />
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          <button className="group relative rounded-lg border border-slate-700/40 bg-slate-800/35 p-2 text-slate-300 transition-all hover:border-blue-500/35 hover:text-blue-300">
            <Bell size={16} />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full border-2 border-[#07080a] bg-blue-600 transition-transform group-hover:scale-125" />
          </button>

          <div className="h-6 w-px bg-slate-700/50" />

          <div className="flex items-center gap-4" ref={profileRef}>
            <div className="hidden flex-col items-end font-sans sm:flex">
              <span className="text-[11px] leading-none font-black tracking-tight text-white">
                {sessionUser?.username || sessionUser?.name || "USUARIO"}
              </span>
              <span className="mt-0.5 text-[8px] font-bold tracking-[0.2em] text-blue-500 uppercase">
                Sesion Activa
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border shadow-lg transition-all",
                  isProfileOpen
                    ? "border-blue-600 bg-blue-600/10 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                    : "border-slate-700 bg-linear-to-br from-slate-700/70 to-slate-900 text-slate-300 hover:border-slate-500"
                )}
                aria-label="Abrir menu de perfil"
              >
                <User size={16} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-700/60 bg-[#111a2b]/95 p-2 font-sans shadow-[0_20px_50px_rgba(0,0,0,0.4)] ring-1 ring-white/8"
                  >
                    <div className="mb-2 rounded-t-xl border-b border-slate-700/50 bg-slate-900/30 px-4 py-3">
                      <p className="mb-1 text-[9px] font-bold tracking-[0.3em] text-slate-600 uppercase">
                        Identidad Digital
                      </p>
                      <p className="truncate text-xs font-semibold text-slate-200">
                        {sessionUser?.email || "usuario@bovedacapital.com"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase transition-all hover:bg-slate-900 hover:text-white">
                        <Settings size={14} /> Configuracion
                      </button>
                    </div>

                    <div className="mx-2 my-2 h-px bg-slate-900" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[10px] font-black tracking-[0.2em] text-red-500/70 uppercase transition-all hover:bg-red-500/5 hover:text-red-500"
                    >
                      <LogOut size={14} /> Desconectar Terminal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
