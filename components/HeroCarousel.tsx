"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = ["/hero.jpg", "/hero2.jpg", "/hero3.jpg"];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#1E3A8A] pt-16 md:pt-2">
      <div className="mx-auto my-auto relative">
        {/* Hero section with carousel, overlay, and text */}
        <div className="relative h-[400px] lg:min-h-screen rounded-lg overflow-hidden">
          {/* Carousel Images */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={slide}
                className={`absolute inset-0 transition-opacity duration-1000 h-full ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  fill
                  priority
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 z-10">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="/hero.jpg"
                alt="Logo Maravilhosa Pesca"
                width={80}
                height={80}
                className="rounded-full"
              />
              <h1 className="text-4xl lg:text-6xl font-bold">
                Maravilhosa Pesca
              </h1>
            </div>
            <div className="bg-black/10 p-6 rounded-lg backdrop-blur-sm max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Tradição em Pescados desde 2003
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Qualidade e variedade em peixes e frutos do mar para toda Belém
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#produtos"
                  className="px-8 py-3 bg-white text-[#1E3A8A] rounded-lg font-bold hover:bg-blue-50 transition-all transform hover:scale-105"
                >
                  Ver Produtos
                </Link>
                <Link
                  href="#contato"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-[10%] left-[10%] w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-[30%] right-[20%] w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-float-delayed"></div>
            <div className="absolute bottom-[20%] left-[30%] w-14 h-14 bg-blue-500 rounded-full opacity-20 animate-float"></div>
          </div>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-4 bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
