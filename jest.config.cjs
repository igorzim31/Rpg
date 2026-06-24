const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

module.exports = {
  testEnvironment: "node",
    transform: { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" },
};