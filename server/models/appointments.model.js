const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    psychId: {
        type: Schema.Types.ObjectId,
        ref: 'Psych'
    },
    time: String,
    date: Date
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment