const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")


router.post('/signup', (req, res) => {

    const { email, password, name, surname } = req.body

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

    User.Patient
        .findOne({ email, accountStatus: 'active'  })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El email ya esta registrado' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)

        User.Patient
            .create({ email, password: hashPass, name, surname })
            .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Signup error' }) : res.status(200).json(newUser)))
            .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})


router.post('/psychsignup', (req, res) => {

    const { email, password, name, surname, problems, meetType, agesTreated, telephone, timetable, profileImg, shortBio, price } = req.body

    const practice = {
        name: req.body.practiceName,
        location: {
            type: 'Point',
            coordinates: [req.body.latitude, req.body.longitude]
        }
    }

    if (!email || !password || !name || !surname || !problems || !meetType || !agesTreated || !telephone || !profileImg ) {
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

    User.Psych
        .findOne({ email, accountStatus: 'active' })
        .then(foundUser => {
            if (foundUser) {
                res.status(400).json({ message: 'El email ya esta registrado' })
                return
            }

            const salt = bcrypt.genSaltSync(10)
            const hashPass = bcrypt.hashSync(password, salt)
            req.body.practiceName !== '' ?
                User.Psych
                    .create({ email, password: hashPass, name, surname, problems, meetType, agesTreated, telephone, timetable, profileImg, shortBio, price, practice })
                    .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Signup error' }) : res.status(200).json(newUser)))
                    .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
                :
                User.Psych
                    .create({ email, password: hashPass, name, surname, problems, meetType, agesTreated, telephone, timetable, profileImg, shortBio, price})
                    .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Signup error' }) : res.status(200).json(newUser)))
                    .catch(() => res.status(500).json({ message: 'Error saving user to DB' }))
        })
})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Fallo autenticando al usuario' });
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