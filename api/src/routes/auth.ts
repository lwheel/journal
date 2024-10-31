import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { signInSchema, signUpSchema } from "../validators/schemas";
import { hash, verify } from "@node-rs/argon2";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { lucia } from "../db/auth";
import { Context } from "../lib/context";
import { auth } from "../middlewares/auth";

const authRoutes = new Hono<Context>();

// Recommended minimum parameters for Argon2 hashing
export const hashOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

authRoutes.post("/sign-in", zValidator("json", signInSchema), async (c) => {
  const { username, password } = c.req.valid("json");

  const user = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .get();

  if (!user) {
    throw new HTTPException(401, {
      message: "Incorrect username or password",
    });
  }

  const validPassword = await verify(user.password_hash, password, hashOptions);

  if (!validPassword) {
    throw new HTTPException(401, {
      message: "Incorrect username or password",
    });
  }

  // Create session
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  c.header("Set-Cookie", sessionCookie.serialize(), {
    append: true,
  });

  return c.json({
    message: "You have been signed in!",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  });
});

authRoutes.post("/sign-up", zValidator("json", signUpSchema), async (c) => {
  const { name, username, password } = c.req.valid("json");

  const passwordHash = await hash(password, hashOptions);

  const newUser = await db
    .insert(users)
    .values({
      username,
      name,
      password_hash: passwordHash,
    })
    .returning()
    .get();

  // Create session
  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  c.header("Set-Cookie", sessionCookie.serialize(), {
    append: true,
  });

  return c.json(
    {
      message: "You have been signed up!",
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
      },
    },
    201,
  );
});

authRoutes.post("/sign-out", async (c) => {
  const session = c.get("session");
  if (!session) {
    throw new HTTPException(401, { message: "No session found" });
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  c.header("Set-Cookie", sessionCookie.serialize());
  return c.json({ message: "You have been signed out!" });
});

export default authRoutes;
