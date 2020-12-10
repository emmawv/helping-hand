const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    psychId: {
        type: Schema.Types.ObjectId,
        ref: 'Psych'
    },
    content: String
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message