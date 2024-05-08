import type { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import { db } from "~/server/db";

vi.mock("~/server/db", () => ({
  db: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(dbMock);
});

export const dbMock = db as unknown as DeepMockProxy<PrismaClient>;
