const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const ObjectId = require('mongoose').Types.ObjectId

const ISODate = require('mongoose').Types.Date

const Appointment = require('../models/appointments.model')


router.get('/getAppointments', (req, res) => {

    Appointment
        .find()
        .populate('userId')
        .populate('psychId')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.post('/newAppointment', (req, res) => {

    const userId = req.user.id
    const { psychId, message, time } = req.body
    const dateStart = new Date(`${req.body.date}T${req.body.time}Z`)
    const dateEnd = new Date(`${req.body.date}T${req.body.time}-01:00`)
    let meetType

    req.body.meetType === '' ? meetType = 'remota' : meetType = req.body.meetType

    Appointment
        .create({ userId, psychId, dateStart, dateEnd, message, time, meetType })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router