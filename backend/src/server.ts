import express from 'express'
import cors from 'cors'
import routesV1 from './app/routes/v1/routes'

const app = express()
const port = 3001
const host = 'localhost'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routesV1)

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, host)
