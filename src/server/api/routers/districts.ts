// import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const districtsRouter = createTRPCRouter({
  getAllDistricts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.district.findMany();
  }),
});
