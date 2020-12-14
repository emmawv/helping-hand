const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')
const Problem = require('../models/problems.model')


router.get('/', (req, res) => {

    User.Psych
        .find({ role: 'DOC' })
        .populate('problems')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/:psych_id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.psych_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    User.Psych
        .findById(req.params.psych_id)
        .populate('problems')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/edit?id=psych_id', (req, res) => {

    User.Psych
        .findByIdAndUpdate(req.params.psych_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router