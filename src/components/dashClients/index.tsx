import React, { useState } from "react";
import ClientModal from "../ClientModal";

export default function Clients() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <div className="h-[40px] w-full flex justify-between items-center">
                <div className="w-[118px] flex gap-2 p-2 rounded-[50px] bg-[#F5F5F5] items-center justify-center">
                    <svg
                        className="w-6 h-6 text-[#D33180]"
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
                            strokeWidth="2"
                            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                        />
                    </svg>
                    <p className="text-[#D33180]">Filtrar</p>
                </div>

                <div className="flex gap-20">
                    <div
                        className="bg-pink-500 p-2 rounded-[50px] h-[40px] flex items-center justify-center w-[180px]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <p className="text-white">+ Adicionar Cliente</p>
                    </div>
                    <div className="bg-pink-500 p-2 rounded-[50px] h-[40px] flex items-center justify-center w-[180px]">
                        <p className="text-[#D33180]">Exportar Clientes</p>
                    </div>
                </div>
            </div>

            <ClientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="min-h-[460px] max-h-[460px] w-full overflow-y-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 border-b">Cliente</th>
                            <th className="py-2 border-b">Telefone</th>
                            <th className="py-2 border-b">Sexo</th>
                            <th className="py-2  border-b">E-mail</th>
                            <th className="py-2  border-b">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-10 border-b flex items-center gap-4">
                                    <div className="w-[40px] h-[40px] bg-gray-500 rounded-full"></div>
                                    Cliente {index + 1}
                                </td>
                                <td className="py-2 px-10 border-b">(11) 91234-5678</td>
                                <td className="py-2 px-10 border-b">Masculino</td>
                                <td className="py-2 px-10 border-b">cliente{index + 1}@exemplo.com</td>
                                <td className="py-2 px-10 border-b flex gap-2">
                                    <button className="text-blue-500">Editar</button>
                                    <button className="text-green-500">Visualizar</button>
                                    <button className="text-yellow-500">Ativar</button>
                                    <button className="text-red-500">Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 w-full">
                <div className="text-gray-700">
                    Mostrando 1-10 de 100 clientes
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#D33180] text-white px-4 py-2 rounded">Anterior</button>
                    <button className="bg-[#D33180] text-white px-4 py-2 rounded">Próximo</button>
                </div>
            </div>
        </div>
    );
}