const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')

router.put('/edit-psych', (req, res) => {

    User.Psych
        .findByIdAndUpdate(req.user._id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/edit-patient', (req, res) => {

    User.Patient
        .findByIdAndUpdate(req.user._id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/delete', (req, res) => {
    User
        .findByIdAndDelete(req.user._id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router