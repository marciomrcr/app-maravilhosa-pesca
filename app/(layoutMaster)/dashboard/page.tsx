"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Bem-vindo ao Dashboard, {session?.user?.email}!
      </h1>
    </div>
  );
}
