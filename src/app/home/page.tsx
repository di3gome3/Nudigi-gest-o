"use client";
import DashboardHome from "@/components/dashboard";
import Sidebar from "@/components/sidebar";


export default function Dashboard() {


    return (
        <div className="grid grid-cols-1 md:grid-cols-5 min-h-[90vh] gap-2">

            <div className="col-span-1 hidden md:block h-full flex items-center justify-center">
                <Sidebar />

            </div>

            <div className="col-span-1 md:col-span-3 p-8 h-full flex items-center justify-center">
                <DashboardHome />
            </div>

            <div className="col-span-1 hidden md:block"></div>
        </div>
    );
}