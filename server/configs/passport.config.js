const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")

const User = require('../models/user.model')
const Psych = require('../models/psychologist.model')

module.exports = app => {

    app.use(session({
        secret: "webmad0820",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    passport.deserializeUser((id, next) => {
        Promise
            .all([User.findById(id), Psych.findById(id)])
            .then(results => results.forEach(elm => next(null, elm)))
            .catch(err => next(err))
    })

    app.use(flash())

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, email, password, next) => {
        Promise
            .all([User.findOne({ email }), Psych.findOne({ email })])
            .then(results => {
                console.log('RESULTS:', results)
                if (!results.length) {
                    return next(null, false, { message: "Email incorrecto" })
                }
                if (results.forEach(elm => !bcrypt.compareSync(password, elm.password))) {
                    return next(null, false, { message: "Contrasena incorrecta" })
                }
                return next(null, user)
            })
            .catch(err => res.status(500).json(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}
