import express from 'express'
import routes from './routes';

import morgan from 'morgan'

const app = express()

app.use(express.json());
app.use(morgan('dev'))

app.use('/api', routes)

app.listen(3333, () => {
    console.log("Server-on port 3333")
})