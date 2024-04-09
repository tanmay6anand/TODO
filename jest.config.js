module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",
  
    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  
    // The test environment that will be used for testing
    testEnvironment: "jsdom",
  
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
  
    // The regexp pattern or array of patterns that Jest uses to detect test files
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  
    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',
  
    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ["/node_modules/"],
  
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  
    // A list of paths to modules that run some code to configure or set up the testing environment before each test
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
  };
  