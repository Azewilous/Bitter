import Account from '../controllers/account.controller.js'
import express from 'express'

export default app => {
    const router = express.Router()

    router.post('/', Account.createAccount)

    router.get('/:id', Account.findAccount)

    router.put('/:id', Account.updateAccount)

    router.delete('/:id', Account.deleteAccount)

    app.use('/api/account/', router)
}