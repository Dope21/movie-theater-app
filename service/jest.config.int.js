module.exports = {
  verbose: true,
  testEnvironment: 'node',
  textRegrex: '.int.spec.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  resetMocks: true,
}