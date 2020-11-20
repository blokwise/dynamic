module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
  },

  moduleFileExtensions: ["js", "json"],

  transform: {
    "^.+\\.js$": "babel-jest",
  },

  verbose: true,

  collectCoverage: true,

  collectCoverageFrom: ["<rootDir>/src/**/*.js"],

  coverageReporters: ["json-summary", "text", "lcov"],

  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@blokwise/)"],

  modulePathIgnorePatterns: ["<rootDir>/docs", "<rootDir>/src/plugins"],

  preset: "@nuxt/test-utils",
};
