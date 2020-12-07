const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")
const Psych = require("../models/psychologist.model")


router.post('/signup', (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Rellena todos los campos' })
        return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ message: 'Formato de email no valido' })
        return
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm)) {
        res.status(400).json({ message: 'Contraseña poco segura' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El email ya esta registrado' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass })
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Signup error' }) : res.status(200).json(newUser)))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})


router.post('/signup/doc', (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: 'Rellena todos los campos' })
        return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ message: 'Formato de email no valido' })
        return
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm)) {
        res.status(400).json({ message: 'Contraseña poco segura' })
        return
    }

    Psych
        .findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El email ya esta registrado' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ email, password: hashPass })
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Signup error' }) : res.status(200).json(newUser)))
                .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})


router.post('/login', (req, res, next) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))

    })(req, res, next)
})


router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Sesion cerrada con exito!' });
})


router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Desautorizado' })) 


module.exports = router