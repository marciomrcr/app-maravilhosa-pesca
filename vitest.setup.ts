// Setup para mocks globais
import { vi } from "vitest";

// Mock do prisma para testes
vi.mock("@/lib/prisma", () => {
  return {
    default: {
      produto: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
      movimentacaoEstoque: {
        create: vi.fn(),
        findMany: vi.fn(),
      },
    },
  };
});
