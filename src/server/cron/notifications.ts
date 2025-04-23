import cron from "node-cron";
import { addDays, endOfDay, startOfDay, startOfToday } from "date-fns";
import { PrismaClient } from "@prisma/client";
import {
  createNotification,
  CreateNotificationInput,
} from "../api/services/notifications.services";
import { NOTIFICATIONS } from "~/utils/notifications/factory";
import { MovementsIncludes } from "~/types/movements";
import { setExternalId } from "~/utils/notifications/setExternalId";
import { TransactionIncludes } from "~/types/transactions";
import { emitNotification } from "../ws/emmiter";

const prisma = new PrismaClient();
// Cada dia, medianoche
// "0 0 * * *"

// Cada dia a las 8 AM
const cronMorning = "0 8 * * *";

// Cada 10 segundos
// const cronTest = "*/10 * * * * *";

// NearDeadline

// 🔔 Notificaciones para movimientos próximos (cada día a las 8 AM)
cron.schedule(cronMorning, async () => {
  console.log("🔔 Cron job: Generar notificaciones programadas");

  const upcomingMovements = await prisma.fixedMovements.findMany({
    where: {
      status: true,
      next_ocurrence: {
        lte: addDays(new Date(), 3), // en los próximos 3 días
        gt: new Date(), // posterior a la fecha actual
      },
    },
  });

  for (const movement of upcomingMovements) {
    const externalId = setExternalId("movement", movement.id, "nearDeadline");

    const exists = await prisma.notifications.findUnique({
      where: { externalId },
    });

    if (exists) {
      console.log(
        `⏩ Ya existe notificación para movimiento ${movement.id} (próximo)`,
      );
      continue;
    }

    const notificationData = NOTIFICATIONS.movement.nearDeadline(
      movement as MovementsIncludes,
    );

    const created = await createNotification(
      prisma,
      notificationData as CreateNotificationInput,
    );

    emitNotification(created);
  }
});

// 🔔 Notificaciones para transacciones próximas (cada día a las 8 AM)
cron.schedule(cronMorning, async () => {
  console.log("🔔 Cron job: Generar notificaciones programadas");

  const upcomingTransactions = await prisma.transaction.findMany({
    where: {
      isProgramed: true,
      isConfirmed: false,
      date: {
        lte: addDays(new Date(), 3), // en los próximos 3 días
        gt: new Date(), // posterior a la fecha actual
      },
    },
  });

  for (const transaction of upcomingTransactions) {
    const externalId = setExternalId(
      "transaction",
      transaction.id,
      "nearDeadline",
    );

    const exists = await prisma.notifications.findUnique({
      where: { externalId },
    });

    if (exists) {
      console.log(
        `⏩ Ya existe notificación para transacción ${transaction.id} (próximo)`,
      );
      continue;
    }

    const notificationData = NOTIFICATIONS.transaction.nearDeadline(
      transaction as TransactionIncludes,
    );

    const created = await createNotification(
      prisma,
      notificationData as CreateNotificationInput,
    );

    emitNotification(created);
  }
});

// Expired

// ❌ transacciones vencidas (cada día a medianoche)
cron.schedule(cronMorning, async () => {
  console.log("🔔 Cron job: Generar notificaciones de transacciones expiradas");

  const expiredTransactions = await prisma.transaction.findMany({
    where: {
      isProgramed: true,
      isConfirmed: false,
      state: 3,
      date: {
        lt: startOfToday(), // solo fechas anteriores a HOY sin contar hoy
      },
    },
  });

  for (const transaction of expiredTransactions) {
    // validamos que por cada transaccion ya se le haya creado su notificacion de expired y si no, la creamos
    const externalId = setExternalId("transaction", transaction.id, "expired");
    const exists = await prisma.notifications.findUnique({
      where: { externalId },
    });

    if (exists) {
      console.log(
        `⏩ Ya existe notificación para transacción ${transaction.id} (vencido)`,
      );
      continue;
    }

    const notificationData = NOTIFICATIONS.transaction.expired(
      transaction as TransactionIncludes,
    );

    const created = await createNotification(
      prisma,
      notificationData as CreateNotificationInput,
    );

    emitNotification(created);
  }
});

// ❌ movimientos vencidos (cada día a medianoche)
cron.schedule(cronMorning, async () => {
  console.log("🔔 Cron job: Generar notificaciones de movimientos expirados");

  const expiredMovements = await prisma.fixedMovements.findMany({
    where: {
      status: true,
      next_ocurrence: {
        lte: startOfToday(), // solo fechas anteriores a HOY sin contar hoy
      },
    },
  });

  for (const movement of expiredMovements) {
    const externalId = setExternalId("movement", movement.id, "expired");
    const exists = await prisma.notifications.findUnique({
      where: { externalId },
    });

    if (exists) {
      console.log(
        `⏩ Ya existe notificación para movimiento ${movement.id} (vencido)`,
      );
      continue;
    }

    const notificationData = NOTIFICATIONS.movement.expired(
      movement as MovementsIncludes,
    );

    const created = await createNotification(
      prisma,
      notificationData as CreateNotificationInput,
    );

    emitNotification(created);
  }
});

// Today last limit date

// 🔔 Notificacion para movimientos programados para el dia actual
cron.schedule(cronMorning, async () => {
  console.log("🔔 Cron job: Generar notificaciones de transacciones para hoy");

  const upcomingMovements = await prisma.fixedMovements.findMany({
    where: {
      next_ocurrence: {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date()),
      },
      status: true,
    },
  });

  for (const movement of upcomingMovements) {
    const externalId = setExternalId("movement", movement.id, "lastDay");
    const exists = await prisma.notifications.findUnique({
      where: { externalId },
    });

    if (exists) {
      console.log(
        `⏩ Ya existe notificación para movimiento ${movement.id} (hoy)`,
      );
      continue;
    }

    const notificationData = NOTIFICATIONS.movement.lastDay(
      movement as MovementsIncludes,
    );

    const created = await createNotification(
      prisma,
      notificationData as CreateNotificationInput,
    );

    emitNotification(created);
  }
});

// 🔔 Notificacion para transacciones programados para el dia actual
cron.schedule(cronMorning, async () => {
  console.log("🔔 Cron job: Generar notificaciones de transacciones para hoy");

  const upcomingTransactions = await prisma.transaction.findMany({
    where: {
      isProgramed: true,
      isConfirmed: false,
      date: {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date()),
      },
    },
  });

  for (const transaction of upcomingTransactions) {
    const externalId = setExternalId("transaction", transaction.id, "lastDay");
    const exists = await prisma.notifications.findUnique({
      where: { externalId },
    });

    if (exists) {
      console.log(
        `⏩ Ya existe notificación para transacción ${transaction.id} (hoy)`,
      );
      continue;
    }

    const notificationData = NOTIFICATIONS.transaction.lastDay(
      transaction as TransactionIncludes,
    );

    const created = await createNotification(
      prisma,
      notificationData as CreateNotificationInput,
    );

    emitNotification(created);
  }
});
