const mongoose = require('mongoose')
const Schema = mongoose.Schema

const psychSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum:['Mujer', 'Hombre', 'No binario']
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    password: String,
    practice: {
        name: String,
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
    },
    timetables: [String],
    problems: [{
        type: Schema.Types.ObjectId,
        ref: 'problems'
    }],
    description: String,
    profileImg: {
        type: String,
        require: true
    },
    messages: [{
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String
    }],
    agesTreated: [{
        type: String,
        enum: ['Adultos mayores (65+)', 'Adultos', 'Adolescentes(14 a 19)', 'Preadolescentes(11 a 13)', 'Niños(6 a 10)', 'Niños pequeños/preescolares(0 a 6)']
    }],
    role: {
        type: String,
        enum: ['USER', 'DOC', 'ADMIN']
    }
}, {
    timestamps: true
})

const Psych = mongoose.model('Psych', psychSchema)
module.exports = Psych