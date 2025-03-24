import dotenv from "dotenv";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import path from "path";

const projectRoot = path.resolve(__dirname, "..", "..");
const webAppRoot = path.resolve(projectRoot, "apps", "web");

dotenv.config({
  path: path.resolve(webAppRoot, ".env.local"),
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
