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
        Team: true,
      },
    });
    return user;
  }),

  getUserByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          name: input.name,
        },
        include: {
          Team: true,
        },
      });
      return user;
    }),

  getUsersByTeamID: publicProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findMany({
        where: {
          team_id: input.teamId,
        },
        include: {
          Team: true,
          Equation: true,
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
          Team: true,
        },
      });
      return user;
    }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      include: {
        Team: true,
        Equation: true,
      },
    });
    return users;
  }),
});
