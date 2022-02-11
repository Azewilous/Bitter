import Account from '../controllers/account.controller.js'
import express from 'express'
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

    router.get('/home', [AuthHeader.authorizeToken], Account.homeAccess)

    router.post('/create', Account.createAccount)

    router.get('/:id', Account.findAccount)

    router.put('/:id', Account.updateAccount)

    router.delete('/:id', Account.deleteAccount)

    router.post('/login', Account.login)

    app.use('/api/account/', router)
}