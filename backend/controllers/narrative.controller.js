import dataHandler from '../models/model.js'

const Narrative = dataHandler.narrative

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

const allNarratives = (req, res) => {
  Narrative.find({}).then(data => {
    if (!data) {
      res.status(404).send({ message: 'No narratives found.' })
    } else {
      res.send(data)
    }
  }).catch(err => {
    res.status(500).send({ message: `Error retrieving narratives. ${err}` })
  })
}

export default {
  narrate,
  allNarratives
}