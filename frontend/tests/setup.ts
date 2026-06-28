import path from "node:path";
import { config } from "dotenv";

// Load .env.test before tests run
config({ path: path.resolve(__dirname, "../.env.test") });
