"use client";
import FinancesControl from "@/components/financesControl";
import FinancesReleases from "@/components/financesReleases";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Financieiro() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-[100vh] gap-2 flex flex-col md:flex-row">
      <div className="col-span-1 hidden md:block h-full">
        <Sidebar />
      </div>

      <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4 w-full">
          <Navbar />
        </div>

        <div className="col-span-4 flex h-full w-full items-center justifty-center grid grid -cols-1 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2 flex items-center p-8">
            <FinancesControl />
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center justify-center p-8">
            <FinancesReleases />
          </div>
        </div>
      </div>
    </div>
  );
}
