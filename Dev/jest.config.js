module.exports = {
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.scss$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
};
