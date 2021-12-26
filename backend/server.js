import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dataHandler from './models/model.js'
import accountRoutes from './routes/account.routes.js'
import dotenv  from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()

const corsOptions = {
    origin: 'http://localhost:4000'
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

accountRoutes(app)

app.get('/', (req, res) => {
    res.json({ message: 'test' })
})

dataHandler.mongoose
    .connect(dataHandler.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.log('cannot connect to the database', err);
    })

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})