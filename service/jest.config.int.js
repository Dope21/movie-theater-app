module.exports = {
  verbose: true,
  testEnvironment: 'node',
  testRegex: '.int.spec.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  resetMocks: true,
}
