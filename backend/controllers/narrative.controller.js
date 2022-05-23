import dataHandler from '../models/model.js'

const Narrative = dataHandler.narrative
const Account = dataHandler.account

const narrate = (req, res) => {
  if (!req.body.message || !req.body.user) {
    res.status(400).send({ message: 'Fields cannot be left empty.' })
    return
  }

  const narrative = new Narrative({
    user: req.body.user,
    message: req.body.message
  })

  narrative.save(narrative).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({ message: err.message || 'Error could not create narrative.' })
  })

}

const allNarratives = async (req, res) => {
  try {
    let narrartives = await Narrative.find({})
    let accounts = await Account.find({ '_id': { '$in': narrartives.map(x => x.user) } })
    console.log(accounts);
    narrartives = narrartives.map(narr => {
      const container = {
        user: narr.user,
        username: accounts.find(acc => acc._id == narr.user).fullname,
        message: narr.message,
        createdAt: narr.createdAt,
        updatedAt: narr.updatedAt,
        id: narr.id
      }
      return container
    })
    console.log(narrartives)
    res.send(narrartives)
  } catch (err) {
    res.status(500).send({ message: `Error retrieving narratives. ${err}` })
  }
  


  // Narrative.find({}).then(async data => {
  //   if (!data) {
  //     res.status(404).send({ message: 'No narratives found.' })
  //   } else {
  //     let narratives = []
  //     let narrativeUsers = data.map(x => x.user)
  //     let accountsList = await Account.find({'_id': { '$in': narrativeUsers }})
  //     data.forEach(x => narratives.push( {createdAt: x.createdAt, user: x.user, message: x.message, fullname: accountsList.find(acc => acc._id = x.user).fullname, id: x.id, updatedAt: x.updatedAt }))
  //     narratives = data.map(x => ({...x, fullname: accountsList.find(acc => acc.id = x.user).fullname}))
  //     data.forEach(x => { narratives.push({ ...x, fullname: accounts.find(acc => acc.id = x.user)})})
  //     res.send(narratives)
  //   }
  // }).catch(err => {
  //   res.status(500).send({ message: `Error retrieving narratives. ${err}` })
  // })
}

export default {
  narrate,
  allNarratives
}