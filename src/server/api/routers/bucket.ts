import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import * as buck from "~/server/bucket";

export const bucketRouter = createTRPCRouter({
  uploadFile: publicProcedure
    .input(
      z.object({
        path: z.string(),
        name: z.string(),
        type: z.enum([
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/gif",
          "image/svg+xml",
        ]),
        access: z.enum(["public-read", "private"]),
      })
    )
    .mutation(async ({ input }) => {
      return buck.uploadFile(input.path, input.name, input.type, input.access);
    }),

  deleteFile: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return buck.deleteFile(input.name);
    }),
});
