import { userInfo } from "node:os";
import type { PrismaConfig } from "prisma";

// E2E 전용 Prisma 설정: 로컬 테스트 DB 에만 마이그레이션을 적용한다.
// .env 의 원격 DATABASE_URL 을 읽지 않도록 dotenv 를 불러오지 않는다.
const E2E_DATABASE_URL: string =
  process.env.E2E_DATABASE_URL ??
  `postgresql://${userInfo().username}@localhost:5432/for_digital_divide_e2e`;

const dbHost: string = new URL(E2E_DATABASE_URL).hostname;
if (!["localhost", "127.0.0.1", "::1"].includes(dbHost)) {
  throw new Error(
    `E2E_DATABASE_URL must point to a local database (got host: ${dbHost})`,
  );
}

export default {
  schema: "../prisma/schema.prisma",
  migrations: {
    path: "../prisma/migrations",
  },
  datasource: {
    url: E2E_DATABASE_URL,
  },
} satisfies PrismaConfig;
