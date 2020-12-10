const session = require("express-session")
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const flash = require("connect-flash")

const User = require('../models/user.model')

module.exports = app => {

    app.use(session({
        secret: "webmad0820",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(theUser => next(null, theUser))
            .catch(err => next(err))
    })

    app.use(flash())

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, email, password, next) => {
        User
            .findOne({ email })
            .then(theUser => {
                if (!theUser) {
                    return next(null, false, { message: "Email incorrecto" })
                }
                if (!bcrypt.compareSync(password, theUser.password)) {
                    return next(null, false, { message: "Contrasena incorrecta" })
                }
                return next(null, user)
            })
            .catch(err => res.status(500).json(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}
