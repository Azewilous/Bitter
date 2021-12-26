import dataHanlder from '../models/model.js'
const Account = dataHanlder.account;

const createAccount = (req, res) => {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
        res.status(400).send({ message: 'Fields cannot be left empty' })
        return
    }
    const account = new Account({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    })

    account.save(account)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500)
            .send({
                message: err.message || 'Error could not create the account'
            })
        })
}

const findAccount = (req, res) => {
    const id = req.params.id

    Account.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Could not find account with id ${id}`})
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({ message: `Error retrieving account with id ${id} ${err}` })
        })
}

const updateAccount = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Account data cannot be empty'
        })
    }

    const id = req.params.id

    Account.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
               res.status(404).send({
                   message: `Could not find and update the account with the id ${id}`
               })
            } else {
                res.send({ message: `Updated the account with the id ${id}` })
            }
        }).catch(err => {
            res.status(500).send({
                message: `Error updating the account with the id ${id}`
            })
        })
}

const deleteAccount = (req, res) => {
    const id = req.params.id

    Account.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Could not find and delete the account with the id ${id}`})
            } else {
                res.send({ message: 'Account was successfully delete ' })
            }
        })
}

export default {
    findAccount,
    createAccount,
    updateAccount,
    deleteAccount
}
