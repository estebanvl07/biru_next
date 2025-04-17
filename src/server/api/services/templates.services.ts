import { Prisma, PrismaClient } from "@prisma/client";

export async function createTemplate(
  db: PrismaClient,
  input: Prisma.TemplatesUncheckedCreateInput,
) {
  try {
    const template = await db.templates.create({
      data: input,
    });
    return template;
  } catch (error) {
    return error;
  }
}

export async function updateTemplate(
  db: PrismaClient,
  input: Prisma.TemplatesUncheckedUpdateInput,
) {
  try {
    const { userId, ...data } = input;

    const template = await db.templates.update({
      data,
      where: {
        id: Number(input.id!),
      },
    });
    return template;
  } catch (error) {
    return error;
  }
}

export async function getTemplates(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  const templates = await db.templates.findMany({
    where: {
      userId,
      bookId,
    },
  });
  return templates;
}

export async function getTemplateById(
  db: PrismaClient,
  id: number,
  userId: string,
  bookId: string,
) {
  try {
    const template = await db.templates.findFirst({
      where: {
        id,
        userId,
        bookId,
      },
      include: {
        user: true,
        transactions: {
          include: {
            category: true,
            entity: true,
          },
        },
      },
    });
    return template;
  } catch (error) {
    return error;
  }
}

export async function disabledTemplate(
  db: PrismaClient,
  id: number,
  userId: string,
  bookId: string,
) {
  try {
    const template = await db.templates.update({
      data: {
        state: 0,
      },
      where: {
        id,
        userId,
        bookId,
      },
    });
    return template;
  } catch (error) {
    return error;
  }
}

export async function availableTemplate(
  db: PrismaClient,
  id: number,
  userId: string,
  bookId: string,
) {
  try {
    const template = await db.templates.update({
      data: {
        state: 1,
      },
      where: {
        id,
        userId,
        bookId,
      },
    });
    return template;
  } catch (error) {
    return error;
  }
}
