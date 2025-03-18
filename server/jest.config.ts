import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
  maxWorkers: 1,
  setupFiles: ["./src/__tests__/jest.setup.ts"],
};

export default config;
