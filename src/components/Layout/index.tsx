import { ReactNode } from "react";
import Sidebar from "../Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <main className="flex w-screen h-screen overflow-hidden">
      {/* The Sidebar */}
      <Sidebar />
      {/* The main view content */}
      <section className="w-full h-full overflow-auto">
        <div className="h-[68px] flex items-center px-[60px] bg-white/90 backdrop-blur-[16px]">
          <span className="font-SohneSemibold text-black-1 tracking-[-0.015em] text-[20px]">
            Dashboard
          </span>
        </div>
        <div className="w-full px-[60px] pt-6">{children}</div>
      </section>
    </main>
  );
}
