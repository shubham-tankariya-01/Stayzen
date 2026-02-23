const express = require("express");
const app = express();
const users = require("./routes/User.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// const cookieParser = require("cookie-parser");

// app.use(cookieParser("SecretCode"));

// //cookies 
// app.get("/getcookies",(req,res)=>{
//     res.cookie('Greet',"hello");
//     res.send("Cookies sent");
// })

// //parse cookies
// app.get("/readcookies",(req,res)=>{
//    console.log(req.cookies);
//    res.send("Consoled cookie");
// });

// app.get("/getSignedCookies",(req,res)=>{
//     res.cookie("Name","Shubham",{signed:true});
//     res.send("Signed Cookies Sent");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Check Console for varification");
// })
const sessionOptions ={
    secret : "supersecretforcode",
    resave : false,
    saveUnintialiazed : true,
}

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
  let {name ="nathi lakhyu" } = req.query;
  console.log(req.session);
  //now adding name to session object (storing information)
  req.session.name = name;
  req.flash("success","User registered Successfully");
  res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
  //using information that we have stored
  res.locals.message = req.flash("success");//making message variable to show the msg
  
  // res.render("page.ejs",{name : req.session.name , msg : req.flash("success" **it is key of flash** )});
  res.render("page.ejs",{name : req.session.name });
});

app.get("/test", (req,res)=>{
    res.send("Test successful");
})


app.use("/users",users);
app.use("/posts",posts);


app.listen(3000,()=>{
    console.log("Server is listening on Port");
});