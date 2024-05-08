import { mock } from "vitest-mock-extended";

vi.mock("~/utils/mailer", () => ({
  mailer: mock({}),
}));
