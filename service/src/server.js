import app from './app'
import database from './app/connections/database'

const port = process.env.SERVER_PORT || 3002

database.connect()

app.get('/healthz', (req, res) => res.status(200).json({ status: 'ok' }))

app.listen(port, () => console.log(`Server is running on port ${port}`))
