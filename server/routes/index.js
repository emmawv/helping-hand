module.exports = app => {

    // Base URLS
    app.use('/api/psych', require('./psych.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}