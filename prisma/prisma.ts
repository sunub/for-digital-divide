import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import { singleton } from "@/utils/singleton";

const logThreshold = Number(process.env.PRISMA_QUERY_LOG_THRESHOLD_MS ?? "50");
const shouldLogQueries =
  process.env.NODE_ENV === "development" &&
  process.env.PRISMA_LOG_QUERIES === "true";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = singleton("prisma", () => {
  const client = new PrismaClient({
    log: shouldLogQueries ? [{ level: "query", emit: "event" }] : [],
    adapter,
  });
  if (shouldLogQueries) {
    client.$on("query", async (e: { duration: number; query: string }) => {
      if (e.duration < logThreshold) return;
      const color =
        e.duration < logThreshold * 1.1
          ? "green"
          : e.duration < logThreshold * 1.2
            ? "blue"
            : e.duration < logThreshold * 1.3
              ? "yellow"
              : e.duration < logThreshold * 1.4
                ? "redBright"
                : "red";
      const dur = chalk[color](`${e.duration}ms`);
      console.info(`prisma:query - ${dur} - ${e.query}`);
    });
  }
  client.$connect();
  return client;
});

export { prisma };
