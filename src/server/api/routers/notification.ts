import { createTRPCRouter, protectedProcedure } from "../trpc";

export const notificationRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        const userId = ctx.session.user.id
        return ctx.db.notifications.findMany({ where: { userId } })
    })
})