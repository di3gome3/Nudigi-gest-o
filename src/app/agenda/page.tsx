"use client";
import Sidebar from "@/components/sidebar";
import React, { useState, useRef } from "react";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Drawer from "@/components/drawer";

interface Professional {
  id: number | string;
  name: string;
  placeholder?: boolean;
}

interface Appointment {
  id: number;
  professionalId: number;
  date: string;
  start: number;
  end: number;
  service: string;
  status: string;
}

function formatTime(time: number): string {
  const hrs = Math.floor(time);
  const mins = Math.round((time - hrs) * 60);
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
}

export default function Agenda() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const professionals: Professional[] = [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Dr. Johnson" },
    { id: 3, name: "Dr. Williams" },
    { id: 6, name: "Dr. Smith" },
    { id: 4, name: "Dr. Johnson" },
    { id: 5, name: "Dr. Williams" },
  ];
  const MIN_ROWS = 5;
  const displayProfessionals: Professional[] =
    professionals.length < MIN_ROWS
      ? [
          ...professionals,
          ...Array.from(
            { length: MIN_ROWS - professionals.length },
            (_, i) => ({
              id: `placeholder-${i}`,
              name: "",
              placeholder: true,
            })
          ),
        ]
      : professionals;

  const appointments: Appointment[] = [
    {
      id: 1,
      professionalId: 1,
      date: "2025-02-18",
      start: 9,
      end: 17.5,
      service: "Consulta Geral",
      status: "confirmado",
    },
    {
      id: 2,
      professionalId: 2,
      date: "2025-02-18",
      start: 10,
      end: 12,
      service: "Exame de Sangue",
      status: "aguardando",
    },
    {
      id: 3,
      professionalId: 3,
      date: "2025-02-19",
      start: 14,
      end: 16,
      service: "Acompanhamento",
      status: "atendimento",
    },
    {
      id: 8,
      professionalId: 3,
      date: "2025-02-18",
      start: 12,
      end: 14,
      service: "Acompanhamento",
      status: "finalizado",
    },
    {
      id: 4,
      professionalId: 5,
      date: "2025-02-18",
      start: 14,
      end: 18,
      service: "Acompanhamento",
      status: "finalizado",
    },
  ];

  const statusColors = {
    confirmado: "#3AAAD6",
    aguardando: "#FF8400",
    atendimento: "#FF0095",
    finalizado: "#2DBB34",
    faltou: "#2DBB34",
  };
  const hours = Array.from({ length: 15 }, (_, i) => 8 + i);
  const hourWidth = 141;
  const totalWidth = hours.length * hourWidth;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const rowHeight = 80;

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("pt-BR", options);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.date === selectedDate?.toISOString().split("T")[0]
  );
  const appointmentCount = filteredAppointments.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 min-h-screen gap-2 flex flex-col md:flex-row">
      <div className="col-span-1 hidden md:block h-full">
        <Sidebar />
      </div>
      <div className="col-span-1 md:col-span-4 grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-4 w-full">
          <Navbar />
        </div>
        <div className="col-span-1 md:col-span-4 flex p-6 max-h-[680px] flex-col">
          <div className="w-full">
            <div className="w-[188px] h-[32px] bg-[#f5f5f5] flex items-center justify-center">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="w-[188px] h-[32px] bg-[#f5f5f5] p-2"
              />
            </div>
            <div className="text-center mt-2 mb-2">
              <h2 className="text-sm font-bold">
                {formatSelectedDate(selectedDate)} - {appointmentCount}{" "}
                agendamentos
              </h2>
            </div>
          </div>
          <div className="w-full flex justify-center item-center overflow-y-auto">
            <div className="w-[30%] bg-white py-3">
              <h2 className="text-[#000000] font-bold mb-3">Profissionais</h2>
              <div className="flex flex-col items-center justify-center mt-[12px]">
                {displayProfessionals.map((professional) => {
                  const professionalAppointments = filteredAppointments.filter(
                    (appointment) =>
                      appointment.professionalId === professional.id
                  ).length;

                  return (
                    <div
                      key={professional.id}
                      className="flex items-center justify-between border-b border-gray-300 w-full"
                      style={{ height: rowHeight }}
                    >
                      <div className="w-[34px] h-[34px] bg-pink-500 rounded-full"></div>
                      <div className="flex-1 pl-2">
                        {"placeholder" in professional &&
                        professional.placeholder ? (
                          <p className="text-[10px] font-bold text-gray-400">
                            Adicione mais profissionais!
                          </p>
                        ) : (
                          <>
                            <p className="text-[10px] font-bold">
                              {professional.name}{" "}
                              <span className="text-gray-500 text-[9px]">
                                ({professionalAppointments})
                              </span>
                            </p>
                            <p className="text-[8px]">Profissão</p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-4/6 md:w-5/6 bg-white">
              <div
                className="overflow-x-auto relative"
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              >
                <div
                  className="sticky top-0 flex items-center bg-white"
                  style={{ width: totalWidth, height: "48px" }}
                >
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="text-center font-bold border-r border-gray-300 flex items-center justify-center"
                      style={{ minWidth: hourWidth, maxWidth: hourWidth }}
                    >
                      {formatTime(hour)}
                    </div>
                  ))}
                </div>
                <div className="relative" style={{ width: totalWidth }}>
                  <div
                    className="absolute top-0 left-0 bottom-0"
                    style={{ width: totalWidth }}
                  >
                    {Array.from(
                      { length: Math.ceil(totalWidth / hourWidth) },
                      (_, i) => (
                        <div
                          key={i}
                          className="absolute border-l border-r border-gray-300"
                          style={{
                            left: `${i * hourWidth}px`,
                            height: "100%",
                            width: "1px",
                          }}
                        />
                      )
                    )}
                  </div>
                  {displayProfessionals.map((professional) => (
                    <div
                      key={professional.id}
                      className="relative border-b border-gray-300 flex items-center"
                      style={{ height: rowHeight }}
                    >
                      {filteredAppointments
                        .filter(
                          (appointment) =>
                            appointment.professionalId === professional.id
                        )
                        .map((appointment) => {
                          const left = (appointment.start - 8) * hourWidth;
                          const width =
                            (appointment.end - appointment.start) * hourWidth;
                          return (
                            <div
                              key={appointment.id}
                              onClick={() => setIsDrawerOpen(true)}
                              className="absolute border rounded p-4 flex flex-col items-start cursor-pointer transition-transform duration-300 hover:scale-95"
                              style={{
                                left: `${left}px`,
                                width: `${width}px`,
                                height: "96%",
                                backgroundColor:
                                  statusColors[
                                    appointment.status as keyof typeof statusColors
                                  ] || "#ccc",
                              }}
                            >
                              <p className="text-[10px] text-[#ffffff] font-bold">
                                {professional.name} - {appointment.status}
                              </p>
                              <p className="text-[#ffffff] text-[9px]">
                                {formatTime(appointment.start)} -{" "}
                                {formatTime(appointment.end)}
                              </p>
                              <p className="text-[#ffffff] text-[9px]">
                                {appointment.service}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <div className="flex flex-col h-full w-full gap-2">
          <div className="pb-[12px] border-b-2 border-pink-500 mb-[40px]">
            <p className="font-bold text-[#D33180]">DADOS DO AGENDAMENTO</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
