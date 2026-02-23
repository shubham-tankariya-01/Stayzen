const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// signup pafe get request
router.get("/signup", (req, res) => {
  res.render("users/singup.ejs");
});

//post request for signup
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      console.log( req.body);
      let { username, email, password ,...userInfo } = req.body;
      let newUser = new User({ username, email ,...userInfo });
      const registeredUser = await User.register(newUser, password);
      // console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          next(err);
        }
        req.flash("success","Welcome to Stayzen")
        res.redirect("/listings");
      })
    }catch (err) {
      req.flash("Failure", err.message);    
      res.redirect("/signup")
    }
  })
);

//login pade get request
router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
});

//post request for login
router.post("/login",saveRedirectUrl,
  passport.authenticate("local",
    { failureRedirect : "/login",
      failureFlash: true
    }) ,
  
  (req,res)=>{
   req.flash("success","Welcome to Stayzen!");
   redirectUrl = res.locals.redirectUrl || "/listings";
   res.redirect(redirectUrl);
});

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","Logged out!");
      res.redirect("/listings");
    })
});

module.exports = router;
