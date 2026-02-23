module.exports.IsLoggedIn = (req,res,next)=>{
    
    if(!req.isAuthenticated()){
        console.log(req.originalUrl);
        req.session.redirectUrl = req.originalUrl;
        req.flash("Failure","Login is Required")
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}