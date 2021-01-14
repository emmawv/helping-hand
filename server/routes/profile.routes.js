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
        .updateMany({ userId: req.params.id }, { status: 'inactive' })
        .then(() => Appointment.find({ status:'inactive' }))
        .then(response => response.map(elm => User.findByIdAndUpdate(elm.psychId, { notifications: true }, { new: true })))
        .then(() => User.findByIdAndUpdate(req.params.id, { accountStatus: 'inactive' }))
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router