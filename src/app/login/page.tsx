import Link from "next/link";

export default function Login() {

    return (
        <div className="grid min-h-[90vh] grid-cols-1 bg-white md:grid-cols-3">

            <div
                className="relative hidden h-full min-h-screen bg-cover bg-center md:block col-span-2"
                style={{ backgroundImage: "url('https://media.istockphoto.com/id/1136670609/pt/foto/happy-woman-washing-hair-in-the-hair-salon.jpg?s=1024x1024&w=is&k=20&c=AZeNitXe7buTfmf2IfOEWqRB6jxefMWzNMCPoEKfUXc=')" }}
            >
                {/* Gradiente para o inner shadow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#D33180] opacity-80"></div>
            </div>

            <div className="flex min-h-screen flex-col items-left justify-center p-4 col-span-1">
                <div className="text-left px-12">
                    <h1 className="text-left text-[50px] text-pink-500 text-left">Entrar</h1>
                    <p className="text-left text-[16px] text-[#4C364C]">Não possui uma conta? <Link href="/"><span className="text-pink-500 underline">Cadastre-se</span></Link></p>
                </div>

                <form className="mx-auto mt-6 w-full max-w-sm">

                    <div className="grid grid-cols-2 gap-2">

                        <div className="col-span-2">
                            <input type="email" id="email" placeholder="Email" className="h-[46px] w-full rounded-md border-2 border-gray bg-transparent p-4 text-[#A694A6]" />
                        </div>

                        <div className="col-span-2">
                            <input type="password" id="password" placeholder="Senha" className="h-[46px] w-full rounded-md border-2 border-gray bg-transparent p-4 text-[#A694A6]" />
                            <p className="text-[#4C364C] text-[10px] underline text-right">Esqueci minha senha?</p>
                        </div>



                        <div className="col-span-2">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500 rounded focus:ring-pink-500 border-gray-300" />
                                    <p className="ml-2 text-gray-700">Eu aceito os <span className="text-pink-500 underline">Termos de uso </span> </p>
                            </label>
                        </div>                        
                        
                        <div className="col-span-2">
                            <button className="h-[46px] w-full cursor-pointer rounded-md bg-[#D33180] text-white transition-transform hover: scale-102">Entrar</button>
                        </div>

                        <div className="col-span-2">
                            <p className="underline text-center cursor-pointer">Política de <span className="text-pink-500 underline">Privacidade </span></p>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    )

}