
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-[90vh] grid-cols-1 bg-gradient-to-b from-[#732B4E] to-[#3A1C29] md:grid-cols-3">
      <div className="flex min-h-screen flex-col items-center justify-center p-4 col-span-1">
        <div className="text-center">
          <h1 className="text-left text-[50px] text-white">Criar uma conta</h1>
          <p className="text-left text-[16px] text-white">Já possui uma conta? <Link href="/login"><span className="text-pink-500 underline">Entrar</span></Link></p>
        </div>
        <form className="mx-auto mt-6 w-full max-w-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <input type="text" id="nome" placeholder="Nome" className="h-[46px] w-full rounded-md bg-white p-4 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
            </div>

            <div className="col-span-1">
              <input type="text" id="sobrenome" placeholder="Sobrenome" className="h-[46px] w-full rounded-md bg-white p-4 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
            </div>

            <div className="col-span-2">
              <input type="email" id="email" placeholder="Email" className="h-[46px] w-full rounded-md border-2 border-white bg-transparent p-4 text-[#A694A6]" />
            </div>

            <div className="col-span-2">
              <input type="text" id="phone" placeholder="Telefone" className="h-[46px] w-full rounded-md border-2 border-white bg-transparent p-4 text-[#A694A6]" />
            </div>

            <div className="col-span-2">
              <input type="password" id="password" placeholder="Senha" className="h-[46px] w-full rounded-md bg-white p-4 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
            </div>

            <div className="col-span-2">
              <button className="h-[46px] w-full cursor-pointer rounded-md bg-[#D33180] text-white transition-transform hover:scale-102">Criar conta</button>
            </div>
          </div>
        </form>
      </div>

      <div
        className="relative hidden h-full min-h-screen bg-cover bg-center md:block col-span-2"
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1136670609/pt/foto/happy-woman-washing-hair-in-the-hair-salon.jpg?s=1024x1024&w=is&k=20&c=AZeNitXe7buTfmf2IfOEWqRB6jxefMWzNMCPoEKfUXc=')" }}
      >
       
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D33180] opacity-80"></div>
      </div>
    </div>
  );
}
