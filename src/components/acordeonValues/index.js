

const AccordionFinances = ({ title, children, isOpen, onToggle }) => {
  return (
    <div>
      <div
        className="flex justify-between items-center p-[3px] cursor-pointer bg-[#F5F5F5] rounded-md h-[27px]"
        onClick={onToggle}
      >
        <h3 className="font-semibold text-[17px]">{title}</h3>
        <span className="transform transition-transform duration-200">
          {isOpen ?

            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5 15 7-7 7 7" />
            </svg>

            :
            <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
            </svg>
          }
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="flex justify-between items-center p-[6px] bg-[#F5F5F5]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionFinances;