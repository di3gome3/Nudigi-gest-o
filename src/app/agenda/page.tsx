"use client";
import Sidebar from "@/components/sidebar";
import React, { useState, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

interface Professional {
  id: number | string;
  name: string;
  placeholder?: boolean;
}

function formatTime(time: number): string {
  const hrs = Math.floor(time);
  const mins = Math.round((time - hrs) * 60);
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export default function Agenda() {
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
          ...Array.from({ length: MIN_ROWS - professionals.length }, (_, i) => ({
            id: `placeholder-${i}`,
            name: "",
            placeholder: true,
          })),
        ]
      : professionals;

  const appointments = [
    {
      id: 1,
      professionalId: 1,
      start: 9,
      end: 17.5,
      service: "Consulta Geral",
      status: "confirmado",
    },
    {
      id: 2,
      professionalId: 2,
      start: 10,
      end: 12,
      service: "Exame de Sangue",
      status: "aguardando",
    },
    {
      id: 3,
      professionalId: 3,
      start: 14,
      end: 16,
      service: "Acompanhamento",
      status: "atendimento",
    },
    {
      id: 4,
      professionalId: 9,
      start: 14,
      end: 16,
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
  const hourWidth = 176;
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

  const rowHeight = 100;

  return (
    <div className="min-h-[90vh] overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-5 w-full min-h-screen gap-2 flex items-center justify-center">
        <div className="col-span-1 hidden md:block min-h-screen">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-4 grid grid-cols-5">
          <div className="h-[50px] w-full col-span-5 flex items-center justify-between"></div>
          <div className="col-span-5 w-full h-[600px] overflow-auto">
            <div className="flex">
              <div className="w-2/6 md:w-1/6 bg-white p-4">
                <h2 className="text-white font-bold mb-4">Profissionais</h2>
                <div className="flex flex-col items-center justify-center mt-[20px]">
                  {displayProfessionals.map((professional) => (
                    <div
                      key={professional.id}
                      className="flex items-center justify-between border-b border-gray-300 w-full"
                      style={{ height: rowHeight }}
                    >
                      <div className="w-[43px] h-[43px] bg-pink-500 rounded-full"></div>
                      <div className="flex-1 pl-2">
                        {"placeholder" in professional && professional.placeholder ? (
                          <p className="text-[13px] font-bold text-gray-400">
                            Adicione mais profissionais!
                          </p>
                        ) : (
                          <>
                            <p className="text-[13px] font-bold">{professional.name}</p>
                            <p className="text-[10px]">Profissão</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
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
                    className="sticky top-0 flex items-center"
                    style={{ width: totalWidth, height: "60px" }}
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
                      {Array.from({ length: Math.ceil(totalWidth / hourWidth) }, (_, i) => (
                        <div
                          key={i}
                          className="absolute border-l border-r border-gray-300"
                          style={{
                            left: `${i * hourWidth}px`,
                            height: "100%",
                            width: "1px",
                          }}
                        />
                      ))}
                    </div>
                    {displayProfessionals.map((professional) => (
                      <div
                        key={professional.id}
                        className="relative border-b border-gray-300 flex items-center"
                        style={{ height: rowHeight }}
                      >
                        {appointments
                          .filter(
                            (appointment) =>
                              appointment.professionalId === professional.id
                          )
                          .map((appointment) => {
                            const left = (appointment.start - 8) * hourWidth;
                            const width = (appointment.end - appointment.start) * hourWidth;
                            return (
                              <div
                                key={appointment.id}
                                className="absolute border rounded p-5 flex flex-col items-start"
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
                                <p className="text-[13px] text-[#ffffff] font-bold">
                                  {professional.name} - {appointment.status}
                                </p>
                                <p className="text-[#ffffff] text-[12px]">
                                  {formatTime(appointment.start)} - {formatTime(appointment.end)}
                                </p>
                                <p className="text-[#ffffff] text-[12px]">
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
      </div>
    </div>
  );
}