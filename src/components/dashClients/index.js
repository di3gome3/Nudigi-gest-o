"use client";
import React, { useEffect, useState } from "react";
import ClientModal from "../ClientModal";

export default function Clients() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10);
  const [totalClients, setTotalClients] = useState(0);

  const totalPages = Math.ceil(totalClients / clientsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //i used this requisition just for test for see how the real users will appear on the table
  const fetchUsers = async () => {
    const URL = "https://dummyjson.com/users";
    try {
      const resp = await fetch(URL);
      if (resp.status === 200) {
        const obj = await resp.json();
        setUsers(obj.users);
        setTotalClients(obj.users.length); 
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;


  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="h-[40px] w-full flex justify-between items-center">
        <div className="w-[118px] flex gap-2 p-2 rounded-[50px] bg-[#F5F5F5] items-center justify-center">
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

      <ClientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="min-h-[460px] max-h-[460px] w-full overflow-y-auto">
        <table className="min-w-full border-collapse">
          <thead className="h-[40px]">
            <tr>
              <th className="border-t border-b border-gray-300 text-center">
                Cliente
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Telefone
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Sexo
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                E-mail
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-b-2 border-gray-300"
              >
                <td className="border-gray-300 py-2 px-4 text-center flex items-center justify-left gap-2">
                  <div className="w-[40px] h-[40px] bg-gray-500 rounded-full inline-block">
                    <img src={user.image} className="w-full h-full" />
                  </div>
                  {user.firstName} {user.lastName}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {user.phone || "N/A"}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {user.gender}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {user.email}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  <div className="flex justify-center gap-2">
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
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-5-4v4h4V3h-4Z"
                      />
                    </svg>

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
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 6H6m12 4H6m12 4H6m12 4H6"
                      />
                    </svg>

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
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"
                      />
                      <path
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

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
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 w-full">
        <div className="text-gray-700">
          Mostrando {startIndex + 1}-{Math.min(endIndex, totalClients)} de{" "}
          {totalClients} clientes
        </div>
        <div className="flex gap-2">
          <button
            className="bg-[#D33180] text-white px-4 py-2 rounded"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="bg-[#D33180] text-white px-4 py-2 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
