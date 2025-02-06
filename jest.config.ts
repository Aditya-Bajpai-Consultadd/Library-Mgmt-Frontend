export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["../src/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
