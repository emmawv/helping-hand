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
    profileImg: {
        type: String,
        default: 'https://lh3.googleusercontent.com/proxy/GKXepNRFEUqVzaTydSOlt5WIPPTJ11I2Wp9YzM43Lm6HHs9p9-v0mr_4aHinV7fnSOi-zadsRVlID0i3wwUEVh3KS59a78r7Y0mphv1g0aMHBin70N2czIkHomKv1mlijFOTqT_U81o'
    },
    appointments: [{
        psychId: {
            type: Schema.Types.ObjectId,
            ref: 'Psych'
        },
        time: String,
        date: Date
    }],
    favourites: [{
        psychId: {
            type: Schema.Types.ObjectId,
            ref: 'Psych'
        }
    }],
    messages: [{
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'Psych'
        },
        content: String
    }],
    role: {
        type: String,
        enum: ['USER', 'DOC', 'ADMIN']
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User