"use client";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Modal from "../modal";
import AccordionFinances from "../acordeonValues";
import Drawer from "../drawer";
import CountUp from "react-countup";
import "aos/dist/aos.css";
import AOS from "aos";

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

const styles = {
  textPrices: "text-[16px] md:text-[24px] font-bold",
  typePrices: "text-[12px] md:text-[16px]",
  buttonDrawer:
    "w-[100%] h-[33px] rounded-md bg-[#f5f5f5] flex items-center justify-center text-pink-500 gap-2 hover:text-white hover:bg-pink-500 transition-transform duration-300 hover:scale-95 cursor-pointer",
  inputGrey:
    "w-full p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-[#F5F5F5] cursor-pointer rounded-md",
  cancelButton:
    "w-[131px] h-[31px] flex items-center justify-center border-2 border-pink-500 rounded-md text-pink-500 font-bold cursor-pointer transition-transform duration-200 hover:scale-95",
  addButton:
    "w-[131px] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95",
  inputValues:
    "w-[81px] border-2 border-[#D33180] rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500",
  boxValues: "flex w-full items-center justify-between",
};

export default function FinancesControl() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClientOpen, setIsModalClientOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerGiftCardOpen, setIsDrawerGiftCardOpen] = useState(false);
  const [isDrawerCardOpen, setIsDrawerCardOpen] = useState(false);
  const [isDrawerServiceOpen, setIsDrawerServiceOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const toggleSwitch = () => {
    setIsOn((prev) => !prev);
  };

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="w-full flex flex-col h-full gap-5">
        <h1 className="text-[18px] font-bold">Controle de entrada e saída</h1>
        <div className="w-full h-[40px] rounded-[20px] border-pink-500 border-2 p-[10px] text-[11px] text-center">
          <p className="text-[8px] md:text-[13px]">
            Period DD/MM/YYYY - DD/MM/YYYY | Categorias - Todas as categorias
          </p>
        </div>
        <div
          className="w-full flex flex-col justify-center items-center"
          data-aos="zoom-in"
        >
          <p className="text-[15px]">Resultado</p>
          <CountUp
            className="text-[29px] font-bold"
            start={0}
            end={44568}
            duration={1}
            separator=","
            decimals={2}
            prefix="R$ "
          />
          <div className="w-full flex flex-row justify-center items-center gap-3 mt-[18px]">
            <div
              className="w-[45%] flex flex-col justify-center items-center gap-2"
              data-aos="fade-down"
            >
              <div className="w-[100%] h-[83px] shadow-md rounded-md p-[18px] border-r-4 border-green-500">
                <p className={styles.typePrices}>Receita</p>
                <CountUp
                  className={styles.textPrices}
                  start={0}
                  end={24564}
                  duration={2}
                  separator=","
                  decimals={2}
                  prefix="R$ "
                />
              </div>
              <div
                className="w-[100px] rounded-[20px] p-[7px] bg-[#2DBB34] cursor-pointer transition-transform duration-200 hover:scale-95 flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <p className="text-[8px] text-white text-center font-bold">
                  Lançar receita
                </p>

                <svg
                  className="w-3 h-3 text-white"
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
                    d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                  />
                </svg>
              </div>
            </div>
            <div
              className="w-[45%] flex flex-col justify-center items-center gap-2"
              data-aos="fade-down"
            >
              <div className="w-[100%] h-[83px] shadow-md rounded-md p-[18px] border-r-4 border-red-500">
                <p className={styles.typePrices}>Despesas</p>
                <CountUp
                  className={styles.textPrices}
                  start={0}
                  end={15456}
                  duration={3}
                  separator=","
                  decimals={2}
                  prefix="R$ "
                />
              </div>
              <div
                className="w-[100px] rounded-[20px] p-[7px] bg-[#EB0402] cursor-pointer transition-transform duration-200 hover:scale-95 flex items-center gap-2"
                onClick={() => setIsModalClientOpen(true)}
              >
                <p className="text-[8px] text-white text-center font-bold">
                  Lançar despesas
                </p>
                <svg
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[216px]" data-aos="fade-up">
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

        <div className="w-full h-[30px] bg-[#F5F5F5] flex justify-evenly p-[10px]">
          <p className="text-[6px]">Fixas R$ 00.00</p>
          <p className="text-[6px]">Fixas R$ 00.00</p>
          <p className="text-[6px]">Fixas R$ 00.00</p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full overflow-x-auto md: overflow-x-none max-h-[600px] md:max-h-[660px]">
          <div className="pb-4 border-b-2 border-pink-500">
            <p className="text-[12px]">FECHAMENTO DE CONTA DO DIA XX/XX/XXX </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-[50%] h-full flex flex-col gap-4 mt-[40px]">
              <div className="flex items-center border rounded-full overflow-hidden shadow-lg">
                <input
                  type="text"
                  placeholder="Nome do Cliente"
                  className="px-4 py-2 w-64 text-gray-500 focus:outline-none"
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full ml-auto w-[60px] text-[20px] font-bold">
                  +
                </button>
              </div>
              <div className="grid grid-cols-2 w-full h-full gap-2">
                <div
                  className={styles.buttonDrawer}
                  onClick={() => setIsDrawerServiceOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                    />
                  </svg>
                  Serviços
                </div>
                <div
                  className={styles.buttonDrawer}
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                    />
                  </svg>
                  Produtos
                </div>
                <div
                  className={styles.buttonDrawer}
                  onClick={() => setIsDrawerGiftCardOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"
                    />
                  </svg>
                  Vale presente
                </div>
                <div
                  className={styles.buttonDrawer}
                  onClick={() => setIsDrawerCardOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                    />
                  </svg>
                  Cartão cliente
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%] h-full mt-[40px] flex flex-col gap-1 md:border-l-2 border-pink-500 pl:0 md:pl-4">
              <div className="w-full h-full flex flex-col gap-1">
                <AccordionFinances
                  title="Pix"
                  isOpen={openIndex === 0}
                  onToggle={() => handleToggle(0)}
                >
                  <div className={styles.boxValues}>
                    <p>Adicionar valor</p>
                    <input
                      type="number"
                      placeholder="0,00"
                      className={styles.inputValues}
                    />
                  </div>
                </AccordionFinances>
                <AccordionFinances
                  title="Crédito"
                  isOpen={openIndex === 1}
                  onToggle={() => handleToggle(1)}
                >
                  <div className={styles.boxValues}>
                    <p>Adicionar valor</p>
                    <input
                      type="number"
                      placeholder="0,00"
                      className={styles.inputValues}
                    />
                  </div>
                </AccordionFinances>
                <AccordionFinances
                  title="Débito"
                  isOpen={openIndex === 2}
                  onToggle={() => handleToggle(2)}
                >
                  <div className={styles.boxValues}>
                    <p>Adicionar valor</p>
                    <input
                      type="number"
                      placeholder="0,00"
                      className={styles.inputValues}
                    />
                  </div>
                </AccordionFinances>
                <AccordionFinances
                  title="Transação Bancária"
                  isOpen={openIndex === 3}
                  onToggle={() => handleToggle(3)}
                >
                  <div className={styles.boxValues}>
                    <p>Adicionar valor</p>
                    <input
                      type="number"
                      placeholder="0,00"
                      className={styles.inputValues}
                    />
                  </div>
                </AccordionFinances>
                <AccordionFinances
                  title="Á vista"
                  isOpen={openIndex === 4}
                  onToggle={() => handleToggle(4)}
                >
                  <div className={styles.boxValues}>
                    <p>Adicionar valor</p>
                    <input
                      type="number"
                      placeholder="0,00"
                      className={styles.inputValues}
                    />
                  </div>
                </AccordionFinances>
                <AccordionFinances
                  title="Pré pago"
                  isOpen={openIndex === 5}
                  onToggle={() => handleToggle(5)}
                >
                  <div className={styles.boxValues}>
                    <p>Adicionar valor</p>
                    <input
                      type="number"
                      placeholder="0,00"
                      className={styles.inputValues}
                    />
                  </div>
                </AccordionFinances>
              </div>

              <div className="w-full h-full flex flex-col gap-1 mt-[30px]">
                <div className="border-b-2 border-black pb-4 flex justify-between items-center">
                  <p className="text-[17px] ">Total</p>

                  <p className="text-[17px] font-bold">0,00</p>
                </div>
                <div className="border-b-2 border-black pb-4 flex justify-between items-center">
                  <p className="text-[17px] ">Recebido</p>

                  <p className="text-[17px] font-bold">0,00</p>
                </div>
                <div className="border-b-2 border-black pb-4 flex justify-between items-center">
                  <p className="text-[17px] ">Troco</p>

                  <p className="text-[17px] font-bold">0,00</p>
                </div>
                <div className="pb-4 flex justify-between items-center mt-[20px]">
                  <div
                    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                      isOn ? "bg-green-500" : "bg-gray-300"
                    }`}
                    onClick={toggleSwitch}
                  >
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                        isOn ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <p>Deixar troco como crédito</p>
                </div>
                <div className="pb-4 flex justify-between items-center">
                  <div
                    className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                      isOn ? "bg-green-500" : "bg-gray-300"
                    }`}
                    onClick={toggleSwitch}
                  >
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ${
                        isOn ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <p>Deixar troco como crédito</p>
                </div>
              </div>

              <div className="w-full h-full flex justify-between items-center">
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button className={styles.addButton}>Fechar conta</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isModalClientOpen}
        onClose={() => setIsModalClientOpen(false)}
      >
        <div className="w-full overflow-x-auto md: overflow-x-none max-h-[600px] md:max-h-[660px]">
          <div className="pb-4 border-b-2 border-pink-500">
            <p className="text-[12px] font-bold text-pink-500">
              ADICIONAR DESPESA
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-[50%] h-full flex flex-col gap-4 mt-[40px] p-4">
              <div className="flex flex-col h-full w-full gap-2">
                <p>Tipo de despesa</p>
                <input
                  type="number"
                  placeholder=""
                  className={styles.inputGrey}
                />
              </div>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col h-full w-[50%] gap-2">
                  <p>Valor</p>
                  <input
                    type="number"
                    placeholder="0,00"
                    className={styles.inputGrey}
                  />
                </div>

                <div className="flex flex-col h-full w-[50%] gap-2">
                  <p>Status</p>
                  <input
                    type="number"
                    placeholder=""
                    className={styles.inputGrey}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col h-full w-[50%] gap-2">
                  <p>Data de pagamento</p>
                  <input
                    type="number"
                    placeholder="DD/MM/YYYY"
                    className={styles.inputGrey}
                  />
                </div>

                <div className="flex flex-col h-full w-[50%] gap-2">
                  <p>Vencimento</p>
                  <input
                    type="number"
                    placeholder="DD/MM/YYYY"
                    className={styles.inputGrey}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div className="flex flex-col h-full w-[50%] gap-2">
                  <p>Metodo de pagamento</p>
                  <input
                    type="number"
                    placeholder=""
                    className={styles.inputGrey}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-[50%] h-full mt-[40px] flex flex-col gap-1 p-4">
              <div className="flex flex-col h-full full gap-2">
                <p>Descrição</p>
                <textarea
                  rows={8}
                  placeholder="Digite aqui..."
                  className="w-full p-2 shadow-sm focus:outline-none border-[#A694A6] border-2 cursor-pointer"
                />
              </div>

              <div className="w-full h-full flex justify-between items-center mt-[60px]">
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsModalClientOpen(false)}
                >
                  Cancelar
                </button>
                <button className="w-[131px] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="flex flex-col h-full w-full gap-2">
          <div className="pb-[12px] border-b-2 border-pink-500 mb-[40px]">
            <p className="font-bold text-[#D33180]">ADICIONAR PRODUTOS</p>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p>Responsavel pela venda</p>
            <div className="space-y-2">
              <select className="w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-[#F5F5F5] cursor-pointer">
                <option value="" disabled selected>
                  Selecione um responsável
                </option>
                <option value="1">João Silva</option>
                <option value="2">Maria Souza</option>
                <option value="3">Carlos Oliveira</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p>Produto</p>
            <div className="space-y-2">
              <select className="w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-[#F5F5F5] cursor-pointer">
                <option value="" disabled selected>
                  Selecione um produto
                </option>
                <option value="1">Produto 1</option>
                <option value="2">Produto 2</option>
                <option value="3">produto 3</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p>Quantidade</p>
            <input
              type="number"
              placeholder="Selecione a quantidade"
              className={styles.inputGrey}
            />
          </div>

          <div className="w-full h-full flex justify-between items-center mt-[300px]">
            <button className="w-[45%] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95">
              Adicionar
            </button>
            <button
              className="w-[45%] h-[31px] flex items-center justify-center border-2 border-pink-500 rounded-md text-pink-500 font-bold cursor-pointer transition-transform duration-200 hover:scale-95"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Drawer>
      <Drawer
        isOpen={isDrawerServiceOpen}
        onClose={() => setIsDrawerServiceOpen(false)}
      >
        <div className="flex flex-col h-full w-full gap-2">
          <div className="pb-[12px] border-b-2 border-pink-500 mb-[40px]">
            <p className="font-bold text-[#D33180]">ADICIONAR SERVIÇO</p>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p>Responsavel pelo serviço</p>
            <div className="space-y-2">
              <select className="w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-[#F5F5F5] cursor-pointer">
                <option value="" disabled selected>
                  Selecione um responsável
                </option>
                <option value="1">João Silva</option>
                <option value="2">Maria Souza</option>
                <option value="3">Carlos Oliveira</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p>Serviço</p>
            <div className="space-y-2">
              <select className="w-full p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-[#F5F5F5] cursor-pointer">
                <option value="" disabled selected>
                  Selecione um Serviço
                </option>
                <option value="1">Serviço 1</option>
                <option value="2">Serviço 2</option>
                <option value="3">Serviço 3</option>
              </select>
            </div>
          </div>

          <div className="w-full h-full flex justify-between items-center mt-[380px]">
            <button className="w-[45%] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95">
              Adicionar
            </button>
            <button
              className="w-[45%] h-[31px] flex items-center justify-center border-2 border-pink-500 rounded-md text-pink-500 font-bold cursor-pointer transition-transform duration-200 hover:scale-95"
              onClick={() => setIsDrawerServiceOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Drawer>
      <Drawer
        isOpen={isDrawerGiftCardOpen}
        onClose={() => setIsDrawerGiftCardOpen(false)}
      >
        <div className="flex flex-col h-full w-full gap-2">
          <div className="pb-[12px] border-b-2 border-pink-500 mb-[40px]">
            <p className="font-bold text-[#D33180]">VALE PRESENTE</p>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p>Número do Cartão presente</p>
            <input type="number" placeholder="" className={styles.inputGrey} />
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col h-full w-[50%] gap-2">
              <p>Validade</p>
              <input
                type="number"
                placeholder="DD/MM/YYYY"
                className={styles.inputGrey}
              />
            </div>

            <div className="flex flex-col h-full w-[50%] gap-2">
              <p>Valor</p>
              <input
                type="number"
                placeholder="00,00"
                className={styles.inputGrey}
              />
            </div>
          </div>

          <div className="w-full h-full flex justify-between items-center mt-[360px]">
            <button className="w-[45%] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95">
              Adicionar
            </button>
            <button
              className="w-[45%] h-[31px] flex items-center justify-center border-2 border-pink-500 rounded-md text-pink-500 font-bold cursor-pointer transition-transform duration-200 hover:scale-95"
              onClick={() => setIsDrawerGiftCardOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Drawer>
      <Drawer
        isOpen={isDrawerCardOpen}
        onClose={() => setIsDrawerCardOpen(false)}
      >
        <div className="flex flex-col h-full w-full gap-2">
          <div className="pb-[12px] border-b-2 border-pink-500 mb-[40px]">
            <p className="font-bold text-[#D33180]">CRÉDITO DE CLIENTE</p>
          </div>

          <div className="flex flex-col h-full w-full gap-2">
            <p className="text-[12px]">Adicionar Valor</p>
            <input type="number" placeholder="" className={styles.inputGrey} />
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col h-full w-[50%] gap-2">
              <p className="text-[12px]">Validade</p>
              <input
                type="number"
                placeholder="DD/MM/YYYY"
                className={styles.inputGrey}
              />
            </div>

            <div className="flex flex-col h-full w-[50%] gap-2">
              <p className="text-[12px]">Método de pagamento</p>
              <input
                type="number"
                placeholder="00,00"
                className={styles.inputGrey}
              />
            </div>
          </div>

          <div className="w-full h-full flex justify-between items-center mt-[360px]">
            <button className="w-[45%] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95">
              Adicionar
            </button>
            <button
              className="w-[45%] h-[31px] flex items-center justify-center border-2 border-pink-500 rounded-md text-pink-500 font-bold cursor-pointer transition-transform duration-200 hover:scale-95"
              onClick={() => setIsDrawerCardOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
