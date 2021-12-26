import dotenv  from 'dotenv'
dotenv.config()

export default (req, res, next) => {
    if (req.headers.apikey != process.env.API_KEY) {
        return res.status(401).send({ message: 'Unathorized' })
    }
    next()
}