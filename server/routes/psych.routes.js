const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Psych = require('../models/psychologist.model')


router.get('/', (req, res) => {

    Psych
        .find()
        //.populate('problems')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/:psych_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.coaster_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Psych
        .findById(req.params.psych_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/edit?id=psych_id', (req, res) => {

    Psych
        .findByIdAndUpdate(req.params.psych_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router