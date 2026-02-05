import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className="
          pt-20
          px-5 sm:px-6
          pb-6
          lg:ml-64 lg:px-8 lg:pt-8
        "
      >
        <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
      </main>
    </div>
  );
}
