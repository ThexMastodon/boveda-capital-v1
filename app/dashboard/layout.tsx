"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import NavBar from "@/src/components/layout/NavBar";
import SideBar from "@/src/components/layout/SideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <SideBar
        isCollapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <NavBar />
        {children}
      </div>
    </div>
  );
}
