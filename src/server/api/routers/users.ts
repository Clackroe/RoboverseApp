import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getLoggedInUser: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user?.id) {
      return null;
    }
    const userId = ctx.session.user.id;

    const user = ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        team: true,
      },
    });
    return user;
  }),

  getUserByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          name: input.name,
        },
        include: {
          team: true,
        },
      });
      return user;
    }),

  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const user = ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
        include: {
          team: true,
        },
      });
      return user;
    }),

  getAllUsers: publicProcedure.query(({ ctx }) => {
    const users = ctx.prisma.user.findMany({
      include: {
        team: true,
      },
    });
    return users;
  }),
});
