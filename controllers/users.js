const User = require("../Models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/singup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password, userInfo } = req.body;
        let newUser = new User({ username, email, userInfo });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Stayzen");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome to Stayzen!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out!");
        res.redirect("/listings");
    });
};
