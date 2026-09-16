module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  moduleFileExtensions: ["ts", "js"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/types/**",
    "!src/index.ts",
    "!src/utils/persian/index.ts"
  ],
};
