import { hash } from "@node-rs/argon2";
import { db, connection } from "./index";
import { posts, users, sessions } from "./schema";
import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { hashOptions } from "../routes/auth";

async function seed() {
  console.log("Seeding the database...");

  try {
    // Clean the tables in reverse dependency order
    console.log("Cleaning existing data...");
    await db.delete(posts);
    await db.delete(users);
    await db.delete(sessions);

    // Reset auto-increment counters
    await db.run(sql`DELETE FROM sqlite_sequence WHERE name = 'posts'`);
    await db.run(sql`DELETE FROM sqlite_sequence WHERE name = 'users'`);

    console.log("Inserting new seed data...");

    const sampleKeywords = [
      "personal growth",
      "mindfulness",
      "productivity",
      "mental health",
      "career reflections",
      "relationships",
      "daily reflections",
      "travel",
      "goals",
      "gratitude",
      "self-discovery",
      "challenges",
    ];

    // Step 1: Insert users
    const sampleUsers = [];
    for (let i = 1; i <= 10; i++) {
      const user = await db
        .insert(users)
        .values({
          name: faker.person.fullName(),
          username: `user-${i}`,
          password_hash: await hash(`pass-${i}`, hashOptions),
        })
        .returning()
        .get();
      sampleUsers.push(user);
    }

    // Step 2: Insert 100 sample posts with 500+ words
    for (let i = 1; i <= 100; i++) {
      const randomKeywords = faker.helpers.arrayElements(sampleKeywords, {
        min: 1,
        max: 3,
      });
      const intro = `Post #${i}: Reflections on ${randomKeywords.join(" ")}`;
      const contentBody = faker.lorem.paragraphs(7); // Approximately 500 words

      const content = `${intro}\n\n${contentBody}`; // Combine intro and body
      const randomUser = faker.helpers.arrayElement(sampleUsers);

      // Generate a recent date
      const recentDate = faker.date.recent({ days: 5 });

      await db
        .insert(posts)
        .values({
          content,
          date: recentDate,  // Directly using Date object
          userId: randomUser.id,
        })
        .returning()
        .get();
    }

    console.log("Seeding completed successfully.");
  } catch (e) {
    console.error("Seeding failed:", e);
  } finally {
    connection.close();
  }
}

seed();
