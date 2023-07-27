import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const teamsRouter = createTRPCRouter({
  getAllTeams: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany({
      include: {
        equationMatchesWithWin: true,
        equationMatchesWithLoss: true,
      },
    });
  }),

  getTeamByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      if (!input.name) {
        return null;
      }
      const team = ctx.prisma.team
        .findUnique({
          where: {
            name: input.name,
          },
        })
        .catch(() => {
          return null;
        });
      return team;
    }),

  getTeamById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      const team = ctx.prisma.team
        .findUnique({
          where: {
            id: input.id,
          },
        })
        .catch(() => {
          return null;
        });
      return team;
    }),

  getTeamEqMatches: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      const matches = ctx.prisma.team.findUnique({
        include: {
          Equation: {
            include: {
              matchesWithLoss: true,
              matchesWithWin: true,
              createdByUser: true,
              Team: true,
            },
          },
        },
        where: {
          name: input.name,
        },
      });
      return matches;
    }),
});
