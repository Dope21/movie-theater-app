import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import router from './app/routes'
import { errorMiddleware } from './app/libs/resErrorHandling'

const app = express()

dotenv.config()

app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))
app.use(process.env.URL_PREFIX, router)
app.use(errorMiddleware)

export default app
