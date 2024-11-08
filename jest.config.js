export const preset = "ts-jest";
export const testEnvironment = "jsdom";
export const moduleNameMapper = {
  "^@/(.*)$": "<rootDir>/src/$1",
};
