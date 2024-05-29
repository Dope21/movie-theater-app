module.exports = {
  verbose: true,
  testEnvironment: 'node',
  testRegex: '.unit.spec.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  resetMocks: true,
}
