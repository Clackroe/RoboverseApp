import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  getAllTeams: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.team.findMany({
      orderBy: { eq_elo: "desc" },
    });
  }),

  getTop3Teams: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.team.findMany({
      orderBy: { eq_elo: "desc" },
      take: 3,
    });
  }),

  // getAllTeamViews: publicProcedure.query(async ({ ctx }) => {
  //   return await ctx.prisma.teamView.findMany({
  //     orderBy: {
  //       eq_elo: "desc",
  //     },
  //   });
  // }),
  getTeamById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.id) {
        return null;
      }
      const team = await ctx.prisma.team
        .findUnique({
          where: {
            id: input.id,
          },
          include: {
            Equation: {
              include: { User: true, TeamInEquationMatch: true },
              orderBy: { elo_contribute: "desc" },
            },
            User: true,
          },
        })
        .catch(() => {
          return null;
        });
      return team;
    }),

  getTeamByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.name) {
        return null;
      }
      const team = await ctx.prisma.team
        .findUnique({
          where: {
            name: input.name,
          },
          include: {
            Equation: { include: { User: true, TeamInEquationMatch: true } },
            User: true,
          },
        })
        .catch(() => {
          return null;
        });
      return team;
    }),
});
