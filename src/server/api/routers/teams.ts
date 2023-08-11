import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { ordinal, rate } from "openskill";

export const teamsRouter = createTRPCRouter({
  getAllTeams: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.team.findMany({
      where: {
        ranking: {
          not: null,
        },
      },
      orderBy: { ranking: "desc" },
    });
  }),

  getTop3Teams: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.team.findMany({
      where: {
        ranking: {
          not: null,
        },
      },
      orderBy: { ranking: "desc" },
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

  getTeamRankHistory: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const matches = await ctx.prisma.teamInEquationMatch
        .findMany({
          where: {
            teamId: input.id,
          },
          take: 10,
          include: {
            EquationMatch: true,
          },
          orderBy: { EquationMatch: { ended: "desc" } },
        })
        .catch(() => {
          return null;
        });

      // console.log(""matches);
      const ret = matches?.map((match) => {
        // console.log(match);
        return {
          id: match.id,
          ranking: match.ranking_after,
          date: match.EquationMatch.ended,
        };
      });
      return ret?.slice(0).reverse();
    }),
});
