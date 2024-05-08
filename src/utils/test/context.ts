import "./mockEnv";
import "./mockMailer";
import { createCaller } from "~/server/api/root";
import { mock, mockDeep } from "vitest-mock-extended";
import { dbMock } from "./db";

export const createTestCaller = () => {
  return mockDeep(
    createCaller({
      db: dbMock,
      session: null,
    }),
  );
};
