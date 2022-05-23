import dataHanlder from '../models/model.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const Account = dataHanlder.account
const HashSalt = Number(process.env.HASH_SALT)

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Fields cannot be left empty' })
    return
  }
  checkAccountLogin(req.body.email, req.body.password).then(account => {
    if (account) {
      const token = jwt.sign(
        {
          id: account.id, email: account.email
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "1h"
        }
      )
      account.token = token
      res.send({ message: 'User successfully logged in', account })
    } else {
      res.status(400).send({ message: 'Could not log user in' })
    }
  }).catch(err => {
    res.status(500).send({ message: 'Error trying to log user in' })
    console.log(err)
  })
}

const createAccount = async (req, res) => {
  if (!req.body.fullname || !req.body.email || !req.body.password) {
    res.status(400).send({ message: 'Fields cannot be left empty' })
    return
  }

  const findAccount = await getAccount(req.body.email)
  if (findAccount) {
    res.status(400).send({ message: 'Account with this email already exists' })
    return
  }

  const hashedPassword = await hashPassword(req.body.password)

  const account = new Account({
    fullname: req.body.fullname,
    email: req.body.email.toLowerCase(),
    password: hashedPassword
  })

  account.save()
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
      if (!data) {
        res.status(404).send({ message: `Could not find account with id ${id}` })
      } else {
        res.send(data)
      }
    }).catch(err => {
      res.status(500).send({ message: `Error retrieving account with id ${id} ${err}` })
    })
}

const updateAccount = (req, res) => {
  if (!req.body) {
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
      console.log(ere)
    })
}

const deleteAccount = (req, res) => {
  const id = req.params.id

  Account.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Could not find and delete the account with the id ${id}` })
      } else {
        res.send({ message: 'Account was successfully delete ' })
      }
    })
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(HashSalt)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

const checkAccountLogin = async (email, password) => {
  try {
    const account = await getAccount(email)
    if (account) {
      const compare = await bcrypt.compare(password, account.password)
      return compare ? account : undefined
    } else {
      return undefined
    }
  } catch (err) {
    throw err
  }
}

const getAccount = async (email) => {
  return await Account.findOne({ email: email.toLowerCase() }).exec()
}

const homeAccess = (req, res) => {
  res.status(200).send('Home Content')
}

export default {
  findAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  login,
  homeAccess
}
