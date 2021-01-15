const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    accountStatus: {
        type: String,
        default: 'active'
    },
    notifications: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    profileImg: {
        type: String,
        default: 'https://res.cloudinary.com/djqsmqs26/image/upload/v1608271085/helping-hand/Twitter-new-2017-avatar-001_vjlpu9.png'
    },
    role: {
        type: String,
        enum: ['PATIENT'],
        default: 'PATIENT'
    },
    accountStatus: {
        type: String,
        default: 'active'
    },
    notifications: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const psychSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    email: {
        type: String,
        required: true
    },
    password: String,
    gender: {
        type: String,
        enum: ['Mujer', 'Hombre', 'No binario']
    },
    telephone: {
        type: Number,
        required: true
    },
    practice: {
        name: String,
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
    },
    timetable: [String],
    problems: [{
        type: [Schema.Types.ObjectId],
        ref: 'Problem'
    }],
    shortBio: String,
    profileImg: {
        type: String,
        require: true
    },
    agesTreated: [{
        type: String,
        enum: ['Adultos mayores (65+)', 'Adultos', 'Adolescentes(14 a 19)', 'Preadolescentes(11 a 13)', 'Niños(6 a 10)', 'Niños pequeños/preescolares(0 a 6)']
    }],
    meetType: [{
        type: String,
        enum: ['remota', 'presencial']
    }],
    price: Number,

    role: {
        type: String,
        enum: ['DOC'],
        default: 'DOC'
    },
    accountStatus: {
        type: String,
        default: 'active'
    },
    notifications: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema, 'users')
User.Patient = mongoose.model('Patient', patientSchema, 'users')
User.Psych = mongoose.model('Psych', psychSchema, 'users')

module.exports = User

