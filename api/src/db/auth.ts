import { Lucia } from "lucia";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./index";
import { sessions, users } from "./schema";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production" ? true : false, // Temporarily set to false for local testing
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use "lax" locally for simpler testing
    },
  },
  
   });

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
  }
}