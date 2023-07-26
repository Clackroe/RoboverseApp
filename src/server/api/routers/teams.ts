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
});
