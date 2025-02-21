"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import CountUp from "react-countup";
import logo from "../../../public/chartIcon.svg";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const styles = {
  boxStyle:
    "col-span-1 h-[160px] rounded-md shadow-md display flex items-center justify-between p-4",
  chartStyle:
    "col-span-1 md:col-span-3 h-[260px] w-full rounded-md shadow-md flex flex-col justify-center p-4 gap-3",
  countUp: "text-[26px] font-bold",
};

const chartData = {
  labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
  datasets: [
    {
      label: "Vendas",
      data: [500, 200, 300, 500, 200, 600],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

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

        <div className="w-full h-full p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={styles.boxStyle}>
            <div className="flex flex-col gap-8 ">
              <p>Resultado</p>

              <CountUp
                className={styles.countUp}
                start={0}
                end={24564}
                duration={2}
                separator=","
                decimals={2}
                prefix="R$ "
              />
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-[10px]">ultimos 30 dias</p>

              <Image src={logo} alt="logo nudigi" width={68} height={60} />
            </div>
          </div>
          <div className={styles.boxStyle}>
            <div className="flex flex-col gap-8 ">
              <p>Receita</p>

              <CountUp
                className={styles.countUp}
                start={0}
                end={34284}
                duration={2}
                separator=","
                decimals={2}
                prefix="R$ "
              />
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-[10px]">ultimos 30 dias</p>

              <Image src={logo} alt="logo nudigi" width={68} height={60} />
            </div>
          </div>
          <div className={styles.boxStyle}>
            <div className="flex flex-col gap-8 ">
              <p>Desepesa</p>

              <CountUp
                className={styles.countUp}
                start={0}
                end={6345}
                duration={2}
                separator=","
                decimals={2}
                prefix="R$ "
              />
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-[10px]">ultimos 30 dias</p>

              <Image src={logo} alt="logo nudigi" width={68} height={60} />
            </div>
          </div>
          <div className={styles.boxStyle}>
            <div className="flex flex-col gap-8 ">
              <p>Agendamentos</p>

              <CountUp
                className={styles.countUp}
                start={0}
                end={1245}
                duration={2}
              />
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-[10px]">ultimos 30 dias</p>

              <Image src={logo} alt="logo nudigi" width={68} height={60} />
            </div>
          </div>
          <div className={styles.boxStyle}>
            <div className="flex flex-col gap-8 ">
              <p>Agendamentos online</p>

              <CountUp
                className={styles.countUp}
                start={0}
                end={4651}
                duration={2}
              />
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-[10px]">ultimos 30 dias</p>

              <Image src={logo} alt="logo nudigi" width={68} height={60} />
            </div>
          </div>
          <div className={styles.boxStyle}>
            <div className="flex flex-col gap-8 ">
              <p>Atendimentos</p>

              <CountUp
                className={styles.countUp}
                start={0}
                end={6516}
                duration={2}
              />
            </div>
            <div className="flex flex-col gap-8 ">
              <p className="text-[10px]">ultimos 30 dias</p>

              <Image src={logo} alt="logo nudigi" width={68} height={60} />
            </div>
          </div>
          <div className={styles.chartStyle}>
            <p className="">Ticket Médio</p>
            <div className="w-full h-[80%]">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>
          <div className={styles.chartStyle}>
            <p className="">Representatividade por categoria</p>
            <div className="w-full h-[80%]">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>
          <div className={styles.chartStyle}>
            <p className="">Representatividade por categoria em R$</p>
            <div className="w-full h-[80%]">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
