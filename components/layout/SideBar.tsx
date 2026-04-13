"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  Menu,
  ShieldCheck,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useSidebar } from "@/hooks/HookSideBar";
import { cn } from "@/lib/utils";
import { authService } from "@/services/authServices";
import { NavModule } from "@/types/Sidebar";

interface SideBarProps {
  isCollapsed: boolean;
  onCollapsedChange: (value: boolean) => void;
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const iconMap = LucideIcons as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <LucideIcons.HelpCircle className={className} />;
  }

  return <IconComponent className={className} />;
};

export default function SideBar({ isCollapsed, onCollapsedChange }: SideBarProps) {
  const { modules, isLoading, error } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [authUser, setAuthUser] = useState<{ name?: string; username?: string } | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const rawUser = window.localStorage.getItem("auth_user");

    if (!rawUser) {
      setAuthUser(null);
      return;
    }

    try {
      setAuthUser(JSON.parse(rawUser) as { name?: string; username?: string });
    } catch {
      setAuthUser(null);
    }
  }, []);

  const toggleMenu = (id: number) => {
    if (isCollapsed) {
      onCollapsedChange(false);
    }

    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleNavigate = (path: string) => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }

    router.push(path);
  };

  const handleLogout = async () => {
    const token = window.localStorage.getItem("auth_token");

    try {
      if (token) {
        await authService.logout(token);
      }
    } catch (logoutError) {
      console.error("Error al cerrar sesion:", logoutError);
    } finally {
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("auth_user");
      router.push("/");
    }
  };

  return (
    <>
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-4 top-4 z-60 rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-white shadow-2xl transition-transform active:scale-95 lg:hidden"
          aria-label="Abrir barra lateral"
        >
          <Menu size={22} />
        </button>
      )}

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-70 bg-black/70 backdrop-blur-md lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        className={cn(
          "fixed left-0 top-0 z-80 flex h-screen flex-col border-r border-slate-700/45 bg-[#0c1423] text-slate-200 shadow-2xl transition-all duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        <button
          onClick={() => onCollapsedChange(!isCollapsed)}
          className="absolute -right-3 top-12 z-100 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-500 lg:flex"
          aria-label={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className={cn("mb-6 p-6 transition-all duration-300", isCollapsed ? "flex justify-center px-4" : "px-8")}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 min-w-10.5 items-center justify-center rounded-xl bg-linear-to-br from-blue-400 to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.26)]">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>

            {!isCollapsed && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col overflow-hidden">
                <span className="text-lg uppercase leading-none text-white" style={{ fontFamily: "var(--font-space-age)" }}>
                  Boveda
                </span>
                <span className="ml-0.5 mt-1 text-[9px] uppercase tracking-[0.4em] text-blue-500" style={{ fontFamily: "var(--font-space-age)" }}>
                  Capital
                </span>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-2">
          {isLoading ? (
            <div className="flex h-40 flex-col items-center justify-center gap-3 opacity-50">
              <Loader2 className="animate-spin text-blue-500" size={24} />
              {!isCollapsed && <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sincronizando Core...</span>}
            </div>
          ) : error ? (
            <div className="mx-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-tighter text-red-400">Falla de Enlace</p>
            </div>
          ) : (
            <>
              {!isCollapsed && (
                <p className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Sistemas Activos</p>
              )}

              {modules.map((module: NavModule) => {
                const hasSubs = Boolean(module.submodules?.length);
                const isOpen = openMenuId === module.id;
                const modulePath = `/dashboard/${module.slug}`;
                const isActive = pathname === modulePath || pathname?.startsWith(`${modulePath}/`);

                return (
                  <div key={module.id} className="space-y-1">
                    <button
                      onClick={() => (hasSubs ? toggleMenu(module.id) : handleNavigate(modulePath))}
                      className={cn(
                        "group relative flex w-full items-center rounded-xl px-4 py-3 transition-all duration-200",
                        isActive ? "bg-blue-500/12 text-blue-300" : "text-slate-300 hover:bg-slate-800/45 hover:text-white",
                        isCollapsed ? "justify-center" : "justify-between"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <DynamicIcon
                          name={module.icon}
                          className={cn("h-5 w-5 min-w-5 transition-colors", isActive ? "text-blue-500" : "group-hover:text-blue-400")}
                        />
                        {!isCollapsed && <span className="whitespace-nowrap text-sm font-semibold tracking-tight">{module.name}</span>}
                      </div>

                      {!isCollapsed && hasSubs && (
                        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform duration-300", isOpen && "rotate-180")} />
                      )}

                      {isCollapsed && isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 h-6 w-1 rounded-r-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]"
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {hasSubs && isOpen && !isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-1 overflow-hidden pl-10"
                        >
                          {module.submodules?.map((sub) => {
                            const subPath = `/dashboard/${module.slug}/${sub.slug}`;
                            const subActive = pathname === subPath;

                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleNavigate(subPath)}
                                className={cn(
                                  "flex w-full items-center gap-3 rounded-lg px-4 py-2 text-[13px] font-medium transition-colors",
                                  subActive ? "bg-blue-500/8 text-blue-300" : "text-slate-400 hover:text-slate-100"
                                )}
                              >
                                <DynamicIcon
                                  name={sub.icon}
                                  className={cn("h-4 w-4 min-w-4", subActive ? "text-blue-400" : "text-slate-500")}
                                />
                                {sub.name}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </>
          )}
        </nav>

        <div className="mt-auto border-t border-slate-900/50 p-4">
          <div className={cn("overflow-hidden rounded-[1.25rem] border border-slate-700/40 bg-slate-800/25 transition-all duration-300", isCollapsed ? "p-2" : "p-4")}>
            <div className={cn("mb-4 flex items-center gap-3", isCollapsed && "mb-0 justify-center")}>
              <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 shadow-inner">
                <User size={18} className="text-blue-400" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-[13px] font-bold leading-tight text-white">
                    {authUser?.name || authUser?.username || "Usuario"}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Sesion activa</span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                onClick={handleLogout}
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 py-2.5 text-[11px] font-bold text-slate-400 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut size={14} className="transition-transform group-hover:-translate-x-1" />
                Desconectar
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
