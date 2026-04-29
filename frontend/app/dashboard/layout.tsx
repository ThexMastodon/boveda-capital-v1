"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <SideBar
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        onMobileOpenChange={setIsMobileOpen}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <NavBar onMenuOpen={() => setIsMobileOpen(true)} />
        {children}
      </div>
    </div>
  );
}
