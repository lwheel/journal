import type { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";

export const authGuard = async (c: Context, next: Next) => {
  const session = c.get("session");
  console.log("Session in authGuard:", session);
  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next();
};