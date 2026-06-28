import { config } from 'dotenv';
import path from 'path';

// Load .env.test before tests run
config({ path: path.resolve(__dirname, '../.env.test') });
