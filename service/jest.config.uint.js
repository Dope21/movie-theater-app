module.exports = {
  verbose: true,
  testEnvironment: 'node',
  textRegrex: '.unit.spec.js',
  setupFilesAfterEnv: ['./jest.setup.js'],
  resetMocks: true,
}