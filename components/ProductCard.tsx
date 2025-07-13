"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href?: string;
}

export default function ProductCard({
  title,
  description,
  imageSrc,
  href = "#",
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-transform hover:scale-105 group">
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={href}
          className="text-[#1E3A8A] font-semibold hover:underline inline-flex items-center"
        >
          Saiba mais
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
