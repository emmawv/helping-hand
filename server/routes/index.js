module.exports = app => {

    // Base URLS
    app.use('/api/psych', require('./psych.routes.js'))
    app.use('/api/auth', require('./auth.routes.js'))
}