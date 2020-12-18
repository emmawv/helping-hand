module.exports = app => {

    // Base URLS
    app.use('/api/psych', require('./psych.routes.js'))
    app.use('/api', require('./auth.routes.js'))
    app.use('/api', require('./appointment.routes.js'))
    app.use('/api', require('./problems.routes'))
    app.use('/api', require('./profile.routes'))
}