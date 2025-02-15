"use client";
import FinancesControl from "@/components/financesControl";
import FinancesReleases from "@/components/financesReleases";
import Sidebar from "@/components/sidebar";

export default function Financieiro() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-[100vh] gap-2 flex flex-col md:flex-row">
      <div className="col-span-1 hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4 flex items-center h-[48px]">
        <div className="col-span-1 md:col-span-4 flex items-center p-8 h-[48px] bg-blue-500 w-full"></div>

        <div className="col-span-1 md:col-span-2 flex items-center p-8">
          <FinancesControl />
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center justify-center p-8">
          <FinancesReleases />
        </div>
      </div>
    </div>
  );
}
