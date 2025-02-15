import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const data = {
  labels: ["Variáveis", "Pessoal", "Fixas"],
  datasets: [
    {
      label: "Despesas por Categoria",
      data: [300, 200, 500],
      backgroundColor: ["#EB0402", "#2DBB34", "#EB9D02"],
      borderColor: ["#EB0402", "#2DBB34", "#EB9D02"],
      borderWidth: 1,
    },
  ],
};

export default function DashboardHome() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 flex items-center justify-center">
      <div className="w-full col-span-1 md:col-span-2" data-aos="zoom-in">
        <h1 className="text-[28px] font-bold">Bom dia! Robson</h1>
        <p>Sábado, 08 de fevereiro </p>
      </div>

      <div className="w-full h-[280px] bg-pink-500 col-span-1 rounded-md p-[16px] flex flex-col " data-aos="fade-up-right" data-aos-duration="1200">
        <div className="pb-2 border-b-2 border-white">
          <p className="text-[28px] text-[#ffffff] font-bold leading-[32px]">
            Resumo <br /> Financeiro
          </p>
        </div>

        <div>
          <p className="text-white mt-2 text-[12px]">
            DD/MM/YYYY até DD/MM/YYYY
          </p>
        </div>

        <div className="h-[60px] w-[45%] shadow-md bg-transparent flex flex-col p-2 mt-4 rounded-md">
          <p className="text-white text-[13px]">Receita do mês</p>
          <p className="text-green-500 text-[16px] font-bold">R$ XXXXX.0</p>
        </div>

        <div className="flex flex-row justify-between items-end">
          <div className="h-[60px] w-[45%] shadow-md bg-white flex flex-col p-2 mt-4 rounded-md">
            <p className="text-black text-[13px]">Despesas do mês</p>
            <p className="text-red-500 text-[16px] font-bold">R$ XXXXX.0</p>
          </div>
          <Link href="/financeiro">
            <div className="h-[36px] border-2 border-white rounded-md w-[36px] flex items-center justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer">
              <svg
                className="w-7 h-7 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full h-[280px] col-span-1 rounded-md p-[16px] border-gray border-2 flex flex-col" data-aos="fade-up-left" data-aos-duration="1300">
        <div className="pb-2 border-b-2 border-pink-500">
          <p className="text-[28px] text-black font-bold leading-[32px]">
            Despesas <br /> por <span className="text-pink-500">Categoria</span>
          </p>
        </div>
        <div>
          <p className="text-black mt-2 text-[12px]">Variáveis e Pessoal</p>
        </div>
        <div className="w-full h-full flex flex-row justify-evenly">
          <div className="w-[75%] h-[72%] mt-7">
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2 h-full mt-12">
            <div className="flex flex-col items-end justify-center pb-5">
              <p className="text-[8px] text-right">Variáveis R$ 300.00</p>
              <p className="text-[8px] text-right">Pessoal R$ 500.00</p>
              <p className="text-[8px] text-right">Fixas R$ 500.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center w-full" data-aos="zoom-in">
        <p className="text-[27px] text-[#000000] font-bold">
          Próximos Compromissos
        </p>
        <svg
          className="w-7 h-7 text-[#000000]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <div className="w-full h-[147px] col-span-1 md:col-span-2 rounded-md border-gray border-2 grid grid-cols-4 gap-3 p-[10px]" data-aos="zoom-in" data-aos-duration="2000">
        <div className="w-full h-full bg-[#F5F5F5] rounded-md"></div>
        <div className="w-full h-full bg-[#F5F5F5] rounded-md"></div>
        <div className="w-full h-full bg-[#F5F5F5] rounded-md"></div>
        <div className="w-[72%] h-full flex flex items-center justify-end">
          <Link href="/financas">
            <div className="h-[36px] border-2 border-pink-500 rounded-md w-[36px] flex items-center justify-center transform transition-transform duration-300 hover:scale-105 cursor-pointer">
              <svg
                className="w-7 h-7 text-[#D33180]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}