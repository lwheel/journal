import { Hono } from "hono";
import postRoutes from "./routes/posts";
import authRoutes from "./routes/auth";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Context } from "./lib/context";
import { auth } from "./middlewares/auth";

const app = new Hono<Context>();

app.use(logger());
app.use(
     "/*",
   cors({
     origin: (origin) => origin, // Allow any origin
     credentials: true, // Allow credentials
     allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
     allowHeaders: ["Content-Type", "Authorization"],
     exposeHeaders: ["Set-Cookie"],
   }),
 );

 app.use("/*", auth);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", authRoutes);
app.route("/", postRoutes);

app.onError((err, c) => {
  console.error(`${err}`);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ message: "An unexpected error occurred!" }, 500);
});

export default app;
