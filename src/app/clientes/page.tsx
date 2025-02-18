"use client";
import Clients from "@/components/dashClients";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Financieiro() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-[100vh] h-full gap-2 flex flex-col md:flex-row">
      <div className="col-span-1 hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center h-full">
        <div className="w-full">
          <Navbar />
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full p-8">
          <Clients />
        </div>
      </div>
    </div>
  );
}