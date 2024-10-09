import { PrismaClient, Prisma } from "@prisma/client";

interface UiSettingProps {
  widgetOrder: string;
  userId: string;
}

export async function setUiSetting(db: PrismaClient, data: UiSettingProps) {
  const { widgetOrder, userId } = data;

  const hasSetting = await db.userSetting.findUnique({ where: { userId } });

  if (hasSetting) {
    const newSetting = await db.userSetting.update({
      data: { widgetOrder },
      where: { userId },
    });
    return newSetting;
  }

  return await db.userSetting.create({ data: { widgetOrder, userId } });
}

export async function getUiSetting(db: PrismaClient, userId: string) {
  return await db.userSetting.findUnique({ where: { userId } });
}
