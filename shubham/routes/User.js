const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("This is a get req for user.");
});

router.get("/:id",(req,res)=>{
    res.send("This is a get req for user and its id.");
});

router.post("",(req,res)=>{
    res.send("This is a post req for user.");
});

router.delete("/:id",(req,res)=>{
    res.send("This is a delete req for user.");
});

module.exports = router;