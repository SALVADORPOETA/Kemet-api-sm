import express from 'express'
import bodyParser from 'body-parser'
import godsRoutes from './routes/gods.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3004',
    'http://localhost:3005',
    'https://kemet-sm.vercel.app',
  ],
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use('/gods', godsRoutes)

app.use('/assets', express.static(path.join(__dirname, './assets')))

app.get('/', (req, res) => {
  const homePageContent = `
  <html>
    <head>
      <title>Homepage</title>
    </head>
    <body>
      <p>
        This is the homepage. Start to use this API here: <a href='https://kemet-api-sm.vercel.app/gods'>Gods Data</a>
      </p>
    </body>
  </html>
  `
  res.send(homePageContent)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
)
