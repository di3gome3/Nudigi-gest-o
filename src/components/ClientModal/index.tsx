

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  inputGrey:
    "w-full p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-[#F5F5F5] cursor-pointer rounded-md",
    cancelButton:
    "w-[131px] h-[31px] flex items-center justify-center border-2 border-pink-500 rounded-md text-pink-500 font-bold cursor-pointer transition-transform duration-200 hover:scale-95",
  addButton:
    "w-[131px] h-[31px] flex items-center justify-center rounded-md bg-pink-500 text-[#FFFFFF] font-bold cursor-pointer transition-transform duration-200 hover:scale-95",
};

export default function ClientModal({
  isOpen,
  onClose,
}: ClientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/2 p-6">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="pb-[12px] border-b-2 border-pink-500 mb-[40px]">
          <p className="font-bold text-[#D33180]">CADASTRAR CLIENTE</p>
        </div>
        <div>
          <div className="flex w-full md:w-[50%] h-full gap-3 grid grid-cols-2">
            <div className="flex flex-col h-full w-full gap-2 col-span-2">
              <p>Nome do cliente</p>
              <input type="text" placeholder="" className={styles.inputGrey} />
            </div>
            <div className="flex flex-col h-full w-full gap-2 col-span-1">
              <p>Telefone</p>
              <input type="text" placeholder="" className={styles.inputGrey} />
            </div>
            <div className="flex flex-col h-full w-full gap-2 col-span-1">
              <p>CPF</p>
              <input type="text" placeholder="" className={styles.inputGrey} />
            </div>
            <div className="flex flex-col h-full w-full gap-2 col-span-2">
              <p>E-mail</p>
              <input type="text" placeholder="" className={styles.inputGrey} />
            </div>
            <div className="flex flex-col h-full w-full gap-2 col-span-1">
              <p>Nascimento</p>
              <input type="text" placeholder="" className={styles.inputGrey} />
            </div>
            <div className="flex flex-col h-full w-full gap-2 col-span-1">
              <p>Redes sociais</p>
              <input type="text" placeholder="" className={styles.inputGrey} />
            </div>
          </div>
          <div className="flex w-full md:w-[50%] h-full gap-3 flex-col">
                
          </div>
        </div>
      </div>
    </div>
  );
}
