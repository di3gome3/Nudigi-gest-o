import React, { useEffect, useState } from 'react';
import Drawer from '../drawer';
import "aos/dist/aos.css";
import AOS from "aos"


const financesData = [
    { id: 1, clientName: 'Cliente A', type: 'pagamento', amount: 150.00, date: '2023-10-10' },
    { id: 2, clientName: 'Cliente B', type: 'venda', amount: -200.00, date: '2023-10-10' },
    { id: 3, clientName: 'Cliente C', type: 'pagamento', amount: 300.00, date: '2023-10-11' },
    { id: 6, clientName: 'Cliente A', type: 'pagamento', amount: 150.00, date: '2023-10-10' },
    { id: 7, clientName: 'Cliente B', type: 'venda', amount: -200.00, date: '2023-10-10' },
    { id: 8, clientName: 'Cliente C', type: 'pagamento', amount: 300.00, date: '2023-10-11' },
    { id: 4, clientName: 'Cliente D', type: 'venda', amount: -50.00, date: '2023-10-11' },
    { id: 5, clientName: 'Cliente E', type: 'pagamento', amount: 100.00, date: '2023-10-12' },
];


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('pt-BR', options);
};


const groupByDate = (data: typeof financesData) => {
    return data.reduce((acc, item) => {
        const date = formatDate(item.date);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, typeof financesData>);
};

export default function FinancesReleases() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const groupedData = groupByDate(financesData);

        useEffect(() => {
          AOS.init({
            duration: 500, 
            once: true,     
          });
        }, []);

    return (
        <div className="w-full h-full flex flex-col gap-5">

            <div className="flex justify-between">
                <p className="text-[#D33180] font-bold">Lançamento</p>
                <button>Filtros</button>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }} data-aos="fade-up">
                {Object.entries(groupedData).map(([date, transactions]) => (
                    <div key={date} className="w-full flex flex-col gap-2 mb-4">
                        <div className="w-full flex flex-col">
                            <p className="font-bold">{date}</p>
                        </div>

                        {transactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="w-full h-[60px] flex justify-between items-center px-[14px] rounded-md border-2 border-gray cursor-pointer transition-transform duration-200 hover:scale-95"
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                <div className="flex items-center gap-2">
                                {transaction.type === 'pagamento' ? (
                                    <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207" />
                                    </svg> ) :(
                                        <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"/>
                                      </svg>
                                      
                                    ) }

                                    <div className="flex flex-col">
                                        <p className="text-[16px] font-bold">{transaction.clientName}</p>
                                        <p className="text-[10px]">
                                            {transaction.type === 'pagamento' ? 'Pagamento do cliente - débito' : 'Venda - crédito'}
                                        </p>
                                    </div>
                                </div>

                                <p
                                    className={`text-[13px] font-bold ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'
                                        }`}
                                >
                                    R$ {Math.abs(transaction.amount).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <div className='w-full h-full flex flex-col'>

                    <div className='pb-[12px] border-b-2 border-pink-500 mb-[40px]'>
                        <p className='font-bold text-[#D33180]'>CLIENTE</p>
                    </div>
                    <div className='mb-[40px] flex flex-col gap-3'>
                        <div className='pb-[10px] border-b-2 border-gray-500 text-[#2C2C2C]'>Nome do cliente</div>
                        <div className='pb-[10px] border-b-2 border-gray-500 text-[#2C2C2C]'>Email: email@email.com</div>
                        <div className='pb-[10px] border-b-2 border-gray-500 text-[#2C2C2C]'>Telefone: 00 4002-8922</div>
                    </div>


                    <div className='pb-[12px] border-b-2 border-pink-500 mb-[40px]'>
                        <p className='font-bold text-[#D33180]'>Dados da Receita</p>
                    </div>
                    <div className='mb-[180px] flex flex-col gap-3'>
                        <div className='pb-[10px] border-b-2 border-gray-500 text-[#2C2C2C]'>Produto</div>
                        <div className='pb-[10px] border-b-2 border-gray-500 text-[#2C2C2C]'>Produto: Nome do produto</div>
                        <div className='pb-[10px] border-b-2 border-gray-500 text-[#2C2C2C]'>Valor: R$ 00,00</div>
                    </div>


                    <div className='p-[6px] text-center bg-pink-500 text-white font-bold w-[135px] rounded-md cursor-pointer' onClick={() => setIsDrawerOpen(false)}>
                        Sair
                    </div>
                </div>

            </Drawer >
        </div >
    );
}