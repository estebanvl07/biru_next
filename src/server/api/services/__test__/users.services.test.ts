/* eslint-disable @typescript-eslint/unbound-method */
import { expect, test, describe } from "vitest";
import { dbMock } from "~/utils/test/db";
import { activateUser } from "../users.services";

describe("Users Services", () => {
  test("activateUser: success", async () => {
    const code = "code";
    const userId = "userId";
    const verificationCodeId = "verificationCodeId";

    dbMock.userVerificationCode.findFirst.mockResolvedValueOnce({
      id: verificationCodeId,
      userId,
    } as never);
    dbMock.user.update.mockResolvedValue({
      id: userId,
    } as never);
    const user = await activateUser(dbMock, code);

    expect(user).toBeDefined();
    expect(dbMock.userVerificationCode.findFirst).toHaveBeenCalledWith({
      where: {
        usedAt: null,
        type: 1,
        token: code,
        expireAt: {
          gte: expect.any(Date), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        },
      },
    });

    expect(dbMock.user.update).toHaveBeenCalledWith({
      where: {
        id: userId,
        emailVerified: null,
      },
      data: {
        emailVerified: expect.any(Date), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      },
    });

    expect(dbMock.userVerificationCode.update).toHaveBeenCalledWith({
      where: {
        usedAt: null,
        type: 1,
        id: verificationCodeId,
      },
      data: {
        usedAt: expect.any(Date), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      },
    });
  });

  test("activateUser: fail when code is not valid", async () => {
    dbMock.userVerificationCode.findFirst.mockResolvedValueOnce(null);
  });
});
