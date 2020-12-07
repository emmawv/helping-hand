const mongoose = require('mongoose')
const Schema = mongoose.Schema

const problemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subgroup: [String]
}, {
    timestamps: true
})

const Problem = mongoose.model('Problem', problemSchema)
module.exports = Problem