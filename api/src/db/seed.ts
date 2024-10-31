import { hash } from "@node-rs/argon2";
import { db, connection } from "./index";
import { posts, users } from "./schema";
import { faker } from "@faker-js/faker";
import { sql } from "drizzle-orm";
import { hashOptions } from "../routes/auth";

async function seed() {
  console.log("Seeding the database...");

  // Clean the tables
  console.log("Cleaning existing data...");
  await db.delete(posts);
  await db.delete(users);

  // Reset the auto-increment counters
  await db.run(
    sql`DELETE FROM sqlite_sequence WHERE name IN ('posts', 'users')`,
  );

  console.log("Inserting new seed data...");

  const sampleKeywords = [
    "technology",
    "innovation",
    "design",
    "development",
    "programming",
    "software",
    "hardware",
    "AI",
    "machine learning",
    "data science",
    "cloud computing",
    "cybersecurity",
  ];

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

  // Insert 100 sample posts
  for (let i = 1; i <= 100; i++) {
    const randomKeywords = faker.helpers.arrayElements(sampleKeywords, {
      min: 1,
      max: 3,
    });
    const content = `Post #${i} ${randomKeywords.join(" ")}`;
    const randomUser = faker.helpers.arrayElement(sampleUsers);
    const post = await db
      .insert(posts)
      .values({
        content,
        date: faker.date.recent({
          days: 5, // The range of days the date may be in the past.
        }), // Generates a random date in the recent past.
        userId: randomUser.id,
      })
      .returning()
      .get();

    }
  }

  console.log("Seeding completed successfully.");
}

seed()
  .catch((e) => {
    console.error("Seeding failed:");
    console.error(e);
  })
  .finally(() => {
    connection.close();
  });
