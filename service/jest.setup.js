if (process.env.APP_ENV == 'local') {
  process.env.APP_ENV = 'test'
  process.env.DATABASE_URL = 'mongodb://localhost:27017/cinema'
  process.env.SERVER_PORT= '3002'
  process.env.URL_PREFIX = '/api/v1'
}