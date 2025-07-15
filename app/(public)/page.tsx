import Footer from "@/components/Footer"; // Importar o componente Footer
import HeroCarousel from "@/components/HeroCarousel";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center font-sans">
      {/* Fixed Menu */}
      <Navbar />

      {/* Hero section with carousel */}
      <HeroCarousel />

      {/* Produtos em Destaque */}
      <section id="produtos" className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Nossos Produtos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              title="Pescados Frescos"
              description="Grande variedade de peixes frescos nacionais e importados"
              imageSrc="/hero.jpg"
              href="#pescados"
            />
            <ProductCard
              title="Frutos do Mar"
              description="Camarões, lagostas, lulas, polvos e outros frutos do mar"
              imageSrc="/hero2.jpg"
              href="#frutos"
            />
            <ProductCard
              title="Pescados Congelados"
              description="Opções práticas e de qualidade para seu dia a dia"
              imageSrc="/hero3.jpg"
              href="#congelados"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-16 bg-blue-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Receba Nossas Novidades
          </h2>
          <p className="text-blue-100 mb-8">
            Cadastre seu e-mail para receber promoções e receitas exclusivas
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="w-full py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Entre em Contato
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Endereço
                </h3>
                <p className="text-gray-600">Rua do Guamá, 1234 - Belém, PA</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Telefones
                </h3>
                <p className="text-gray-600">(91) 98765-4321</p>
                <p className="text-gray-600">(91) 3321-4321</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">E-mail</h3>
                <p className="text-gray-600">contato@maravilhosapesca.com.br</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Horário de Funcionamento
                </h3>
                <p className="text-gray-600">Segunda a Sábado: 7h às 18h</p>
                <p className="text-gray-600">Domingo: 7h às 12h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
