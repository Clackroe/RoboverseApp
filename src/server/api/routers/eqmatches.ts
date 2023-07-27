import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eqmatchesRouter = createTRPCRouter({
  getAllEqMatches: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.equationMatch.findMany({
      include: {
        losingEquation: true,
        winningEquation: true,
        losingTeam: true,
        winningTeam: true,
        team1: true,
        team2: true,
        team1Equation: true,
        team2Equation: true,
      },
    });
  }),
});
