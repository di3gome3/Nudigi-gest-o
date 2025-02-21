import React, { useState } from "react";
import * as Papa from "papaparse";

export default function ConsultaAgendamento() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clientsPerPage, setClientsPerPage] = useState<number>(10);
  const [totalClients, setTotalClients] = useState<number>(100);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    client: "",
    professional: "",
    category: "",
    status: "",
    service: "",
    recurring: false,
    accountClosure: false,
  });

  const totalPages = Math.ceil(totalClients / clientsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;

  const styles = {
    inputfilter: "bg-[#F5F5F5] text-center p-1 border border-gray-300 rounded",
  };

  // Sample data
  const clients = Array.from({ length: totalClients }).map((_, index) => ({
    id: index + 1,
    name: `Cliente ${index + 1}`,
    phone: `(11) 91234-5678`,
    sex: "Masculino",
    email: `cliente${index + 1}@exemplo.com`,
    date: `2025-02-${index + 1}`,
    time: `10:${index % 60 < 10 ? "0" : ""}${index % 60}`,
    professional: `Profissional ${index + 1}`,
    service: `Serviço ${index + 1}`,
    duration: `${index + 30} min`,
    value: `R$ ${index * 10 + 50},00`,
    status: index % 2 === 0 ? "Finalizado" : "Aguardando",
    obs: `Observação ${index + 1}`,
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY3Ld-5LejWEzC_PC7JbSQ-XQkyIKirHQOEA&s",
    registration: `2023-10-${index + 1}`,
  }));

  // Filtrar os dados (exemplo básico)
  const applyFilters = () => {
    const filteredClients = clients.filter((client) => {
      const matchesDate =
        (!filters.dateFrom || client.date >= filters.dateFrom) &&
        (!filters.dateTo || client.date <= filters.dateTo);
      const matchesClient =
        !filters.client || client.name.includes(filters.client);
      const matchesProfessional =
        !filters.professional ||
        client.professional.includes(filters.professional);
      const matchesStatus = !filters.status || client.status === filters.status;
      const matchesRecurring = !filters.recurring || false; // Ajuste conforme a lógica de "recurring"

      return (
        matchesDate &&
        matchesClient &&
        matchesProfessional &&
        matchesStatus &&
        matchesRecurring
      );
    });

    setTotalClients(filteredClients.length);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      client: "",
      professional: "",
      category: "",
      status: "",
      service: "",
      recurring: false,
      accountClosure: false,
    });
    setTotalClients(100);
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    // Transformar dados em formato amigável
    const csvData = paginatedClients.map((client) => ({
      Data: client.date.replace(/-/g, "/"), // Formatar a data como string
      Hora: client.time,
      Profissional: client.professional,
      Serviço: client.service,
      Duração: client.duration,
      Cliente: client.name,
      Valor: client.value,
      Status: client.status,
      Cadastro: client.registration,
    }));

    // Adicionar cabeçalho manualmente
    const headers =
      "Data; Hora; Profissional; Serviço; Duração; Cliente; Valor; Status; Cadastro";
    const csvString =
      headers +
      "\n" +
      Papa.unparse(csvData, {
        delimiter: "; ",
      });

    
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "agendamentos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedClients = clients.slice(startIndex, endIndex);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <div className="h-[40px] w-full flex justify-between items-center">
        <div
          className="w-[118px] flex gap-2 p-2 rounded-[50px] bg-[#F5F5F5] items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
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
      </div>

      {/* Modal de Filtros */}
      {isModalOpen && (
        <div className="w-full p-4 shadow-md rounded-md">
          <div className="flex justify-between items-start">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                applyFilters();
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center">
                <label className="mr-2">Datas:</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters({ ...filters, dateFrom: e.target.value })
                  }
                  className={styles.inputfilter}
                />
                <span className="mx-2">até</span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters({ ...filters, dateTo: e.target.value })
                  }
                  className={styles.inputfilter}
                />
              </div>

              <div className="flex items-center">
                <label className="mr-2">Cliente:</label>
                <select
                  value={filters.client}
                  onChange={(e) =>
                    setFilters({ ...filters, client: e.target.value })
                  }
                  className={styles.inputfilter}
                >
                  <option value="">Selecionar</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <span className="mx-4">Profissional:</span>
                <select
                  value={filters.professional}
                  onChange={(e) =>
                    setFilters({ ...filters, professional: e.target.value })
                  }
                  className={styles.inputfilter}
                >
                  <option value="">Selecionar</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.professional}>
                      {client.professional}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="mr-2">Categoria:</label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className={styles.inputfilter}
                >
                  <option value="">Selecionar</option>
                  <option value="Categoria 1">Categoria 1</option>
                  <option value="Categoria 2">Categoria 2</option>
                </select>
                <span className="mx-4">Status:</span>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className={styles.inputfilter}
                >
                  <option value="">Selecionar</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Aguardando">Aguardando</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="mr-2">Serviço:</label>
                <select
                  value={filters.service}
                  onChange={(e) =>
                    setFilters({ ...filters, service: e.target.value })
                  }
                  className={styles.inputfilter}
                >
                  <option value="">Selecionar</option>
                  <option value="Serviço 1">Serviço 1</option>
                  <option value="Serviço 2">Serviço 2</option>
                </select>
                <span className="mx-4">Fechamento Conta:</span>
                <input
                  type="checkbox"
                  checked={filters.accountClosure}
                  onChange={(e) =>
                    setFilters({ ...filters, accountClosure: e.target.checked })
                  }
                />
              </div>

              <div className="flex items-center col-span-2">
                <span className="mr-2">Serviços com Fotos:</span>
                <input
                  type="checkbox"
                  checked={filters.recurring}
                  onChange={(e) =>
                    setFilters({ ...filters, recurring: e.target.checked })
                  }
                />
                <span className="ml-2">Somente agendamentos recorrentes</span>
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#D33180] text-white px-4 py-2 rounded-md"
                >
                  Filtrar
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-2 border-2 border-[#D33180] text-[#D33180] px-4 py-2 rounded-md"
                >
                  Limpar
                </button>
              </div>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-[#D33180] text-2xl ml-2"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="min-h-[460px] max-h-[460px] w-full overflow-y-auto">
        <table className="min-w-full border-collapse">
          <thead className="h-[40px]">
            <tr>
              <th className="border-t border-b border-gray-300 text-center">
                {" "}
                Data
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Hora
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Profissional
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Serviço
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Duração
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Cliente
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Valor
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Status
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Foto
              </th>
              <th className="border-t border-b border-gray-300 text-center">
                Cadastro
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map((client, index) => (
              <tr
                key={client.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-200"}
              >
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.date}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.time}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.professional}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.service}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.duration}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.name}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.value}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.status}
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  <img
                    src={client.photo}
                    alt="Foto"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </td>
                <td className="border-gray-300 py-2 px-4 text-center">
                  {client.registration}
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
          <button
            onClick={exportToCSV}
            className="bg-[#007BFF] text-white px-4 py-2 rounded mt-4"
          >
            Exportar CSV
          </button>
        </div>
      </div>
    </div>
  );
}
