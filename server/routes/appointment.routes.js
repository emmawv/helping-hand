const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Appointment = require('../models/appointments.model')

router.get('/getAllAppointments', (req, res) => {

    req.user.role === 'PATIENT'
        ?
    Appointment
        .find({userId: req.user.id})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
        : 
    Appointment
        .find({ psychId: req.user.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
        
})

router.post('/newAppointment', (req, res) => {

    const userId = req.user.id
    const { psychId, time, date } = req.body

    Appointment
        .create({ userId, psychId, time, date })
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router