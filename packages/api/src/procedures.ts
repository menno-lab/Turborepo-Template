import { baseProcedure } from "./init";
import { authenticatedMiddleware, protectedMiddleware } from "./middleware";

export const authenticatedProcedure = baseProcedure.use(
  authenticatedMiddleware
);

export const protectedProcedure =
  authenticatedProcedure.use(protectedMiddleware);
