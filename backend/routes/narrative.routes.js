import express from 'express'
import Narrative from '../controllers/narrative.controller.js'
import AuthHeader from '../auth/auth-header.js'

export default app => {
  const router = express.Router()

  app.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  router.get('/all', [AuthHeader.authorizeToken], Narrative.allNarratives)

  router.post('/create', [AuthHeader.authorizeToken], Narrative.narrate)

  app.use('/api/narrative', router)

}