import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import dataHandler from './models/model.js'
import accountRoutes from './routes/account.routes.js'
import narrativeRoutes from './routes/narrative.routes.js'
import dotenv  from 'dotenv'
import helmet from 'helmet'
import routeAuth from './auth/auth.js'
import { createLiveServer } from './live/live.server.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()

const corsOptions = {
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}

app.use(helmet())

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.set('base', 'api')

app.use(routeAuth)

accountRoutes(app)
narrativeRoutes(app)

app.get('/api', (req, res) => {
    res.json({ message: 'ok' })
})

dataHandler.mongoose
    .connect(dataHandler.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.log('cannot connect to the database', err);
    })

const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

createLiveServer(server)