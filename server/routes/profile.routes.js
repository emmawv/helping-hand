const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = require('../models/user.model')
const Appointment = require('../models/appointments.model')

router.put('/edit-psych', (req, res) => {

    User.Psych
        .findByIdAndUpdate(req.user.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/edit-patient', (req, res) => {

    User.Patient
        .findByIdAndUpdate(req.user.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete', (req, res) => {

    Appointment
        .deleteMany({ userId: req.user._id })
        .then(() => {
            console.log(req.user.id)
            return User.findByIdAndDelete(req.user._id)
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router