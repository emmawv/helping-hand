const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    psychId: {
        type: Schema.Types.ObjectId,
        ref: 'Psych'
    },
    dateStart: Date,
    dateEnd: Date,
    message: String,
    time: String,
    meetType: {
        type: String,
        default: 'remota'
    },
    address: String,
    status: {
        type: String,
        default: 'active'
    }
}, {
    timestamps: true
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment