const sessionVerify = function (req, res, next) {
    if (req.cookies.user) {
        req.session.user = req.cookies.user
    }

    if (req.session.user) {
        req.locals.user = req.session.user
    }

    next()
}

module.exports = {
    sessionVerify
}