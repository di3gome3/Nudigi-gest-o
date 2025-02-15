import Image from "next/image";
import logo from "../../../public/logoNudigi.svg"

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full grid grid-cols-3 md:grid-cols-5 border-b-2 border-pink-500 h-[52px] z-10">
      <div className="col-span-2 md:col-span-1 w-full h-full bg-[#D33180] flex items-center justify-left gap-3 px-[20px]">
        <Image
          src={logo}          
          alt="logo nudigi"
          width={36}
          height={36}
        />
        <p className="text-[23px] text-white">
          Nudigi
        </p>
      </div>
      <div className="col-span-1 md:col-span-4 w-full h-full bg-white">

      </div>

    </div>
  );
}
