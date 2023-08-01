// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eqmatchesRouter = createTRPCRouter({
  getAllEqMatches: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.equationMatch.findMany({
      include: {
        TeamInEquationMatch: true,
      },
    });
  }),
});
