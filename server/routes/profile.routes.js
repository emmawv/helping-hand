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

router.put('/delete/:id', (req, res) => {

    Appointment
        .deleteMany({ userId: req.params.id })
        .then(response => {
            console.log(response)
            return User.findByIdAndDelete(req.params.id)
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router