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
    password: String
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
        default: 'https://lh3.googleusercontent.com/proxy/GKXepNRFEUqVzaTydSOlt5WIPPTJ11I2Wp9YzM43Lm6HHs9p9-v0mr_4aHinV7fnSOi-zadsRVlID0i3wwUEVh3KS59a78r7Y0mphv1g0aMHBin70N2czIkHomKv1mlijFOTqT_U81o'
    },
    favourites: [{
        psychId: {
            type: Schema.Types.ObjectId,
            ref: 'Psych'
        }
    }],
    role: {
        type: String,
        enum: ['PATIENT'],
        default: 'PATIENT'
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
    description: String,
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
    role: {
        type: String,
        enum: ['DOC'],
        desfault: 'DOC'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema, 'users')
User.Patient = mongoose.model('Patient', patientSchema, 'users')
User.Psych = mongoose.model('Psych', psychSchema, 'users')

module.exports = User

