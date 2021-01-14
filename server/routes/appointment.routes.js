const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Appointment = require('../models/appointments.model')


router.get('/getAppointments', (req, res) => {

    Appointment
        .find({dateStart: {$gt: new Date()}})
        .populate('userId')
        .populate('psychId')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/newAppointment', (req, res) => {

    const { userId, psychId, message, time, address } = req.body
    const dateStart = new Date(`${req.body.date}T${req.body.time}Z`)
    const dateEnd = new Date(`${req.body.date}T${req.body.time}-01:00`)
    let meetType

    req.body.meetType === '' ? meetType = 'remota' : meetType = req.body.meetType

    Appointment
        .create({ userId, psychId, dateStart, dateEnd, message, time, meetType, address})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/delete-appointment', (req, res) => {
    Appointment
        .findByIdAndDelete(req.body._id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router