import Image from "next/image";

export default function LoginPage() {
  return (
    <section className="w-full max-w-2xl mx-auto p-8 rounded-xl shadow-xl bg-white flex flex-col items-center gap-8">
      <header className="flex flex-col items-center gap-2">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={80}
          height={80}
          className="mb-2"
        />
        <h1 className="text-4xl font-bold text-blue-900">
          App Maravilhosa Pesca
        </h1>
        <p className="text-lg text-blue-700">
          Produtos frescos, promoções e entrega rápida!
        </p>
      </header>
      <a
        href="#login"
        className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition"
      >
        Entrar
      </a>
      <div className="flex flex-col items-center gap-2 mt-6">
        <span className="text-gray-500">
          Faça seu pedido online e receba em casa
        </span>
        <span className="text-sm text-gray-400">
          Entrega gratuita no bairro Guamá
        </span>
      </div>
      <footer className="mt-8 text-xs text-gray-400">
        © 2025 Maravilhosa Pesca. Todos os direitos reservados.
      </footer>
    </section>
  );
}
