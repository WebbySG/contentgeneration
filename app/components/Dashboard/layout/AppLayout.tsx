"use client";

import { useState } from "react";
import AppSidebar from "./AppSidebar";
import { Client } from "../../../types/business";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <AppSidebar
        clients={clients}
        currentClient={currentClient}
        onClientChange={setCurrentClient}
        isAgency={true}
      />

      {/* Main Content */}
      <main className="flex-1 relative overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
