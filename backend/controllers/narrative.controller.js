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
}

export default {
  narrate,
  allNarratives
}