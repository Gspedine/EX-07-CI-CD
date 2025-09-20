// jest.config.js - AJUSTE TEMPORÁRIO
export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,  
      functions: 80, 
      lines: 85,     
      statements: 85
    }
  }
};