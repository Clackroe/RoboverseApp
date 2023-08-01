import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { usersRouter } from "./routers/users";
import { teamsRouter } from "./routers/teams";
import { eqmatchesRouter } from "./routers/eqmatches";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  users: usersRouter,
  teams: teamsRouter,
  eqMatches: eqmatchesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
