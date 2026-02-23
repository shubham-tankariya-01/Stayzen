const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("This is a get req for posts.");
});

router.get("/:id",(req,res)=>{
    res.send("This is a get req for posts and its id.");
});

router.post("/",(req,res)=>{
    res.send("This is a post req for posts.");
});

router.delete("/:id",(req,res)=>{
    res.send("This is a delete req for posts.");
});

module.exports = router;