module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFiles: ["<rootDir>/src/setup-tests.ts"],
};
