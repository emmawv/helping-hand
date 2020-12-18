const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Problem = require('../models/problems.model')

router.get('/getProblems', (req, res) => {
    Problem
        .find({}, {name: 1, id: 1})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router