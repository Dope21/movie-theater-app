import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import database from './app/connections/database'

const app = express()
const port = process.env.SERVER_PORT || 3002

dotenv.config()
database.connect()

app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok' }))

app.listen(port, () => console.log(`Server is running on port ${port}`))
