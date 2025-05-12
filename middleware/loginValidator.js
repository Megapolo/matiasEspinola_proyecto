const loginVerify = (req, res, next) => {
    if (req.session.user) {
        console.log("usuario logueado");
        console.log(req.session.user);
        next()
        //res.redirect("/users/profile/" + req.session.user.id);
    } else {
        res.redirect("/users/login");
    }
};

module.exports = loginVerify;