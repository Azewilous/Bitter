import jwt from 'jsonwebtoken'

export const authorizeToken = (req, res, next) => {
  let token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({ message: 'No token provided.' })
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    req.id = decoded.id
    next()
  })
}

export default {
  authorizeToken
}