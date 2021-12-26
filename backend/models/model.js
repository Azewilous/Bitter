import dbConfig from '../config/db.config.js'
import mongoose from 'mongoose'
import account from './account.model.js'

mongoose.Promise = global.Promise

const dataHandler = {};

dataHandler.mongoose = mongoose
dataHandler.url = dbConfig.url
dataHandler.account = account(mongoose)

export default dataHandler