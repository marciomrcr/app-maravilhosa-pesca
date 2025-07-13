"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#1E3A8A] shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center gap-2">
        <Image
          src="/hero.jpg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-2xl font-bold text-white">Maravilhosa Pesca</span>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-white hover:text-blue-200">
          Home
        </Link>
        <Link href="#sobre" className="text-white hover:text-blue-200">
          Sobre Nós
        </Link>
        <Link href="#peixarias" className="text-white hover:text-blue-200">
          Peixarias
        </Link>
        <Link href="#produtos" className="text-white hover:text-blue-200">
          Produtos
        </Link>
        <Link href="#receitas" className="text-white hover:text-blue-200">
          Receitas
        </Link>
        <Link href="#contato" className="text-white hover:text-blue-200">
          Contato
        </Link>
        <Link
          href="/login"
          className="px-6 py-2 bg-white text-[#1E3A8A] rounded-lg font-semibold shadow hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
      {/* Mobile menu button */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1E3A8A] md:hidden p-4 flex flex-col gap-4">
          <Link href="/" className="text-white hover:text-blue-200 py-2">
            Home
          </Link>
          <Link href="#sobre" className="text-white hover:text-blue-200 py-2">
            Sobre Nós
          </Link>
          <Link
            href="#peixarias"
            className="text-white hover:text-blue-200 py-2"
          >
            Peixarias
          </Link>
          <Link
            href="#produtos"
            className="text-white hover:text-blue-200 py-2"
          >
            Produtos
          </Link>
          <Link
            href="#receitas"
            className="text-white hover:text-blue-200 py-2"
          >
            Receitas
          </Link>
          <Link href="#contato" className="text-white hover:text-blue-200 py-2">
            Contato
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 bg-white text-[#1E3A8A] rounded-lg font-semibold shadow hover:bg-blue-50 transition w-full text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
