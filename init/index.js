const mongoose = require("mongoose");
const initData = require("./sampleData.js");
const Listing = require("../Models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/stayzen"

main().then(()=>{
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

//function for entring data
const initDB = async ()=>{
  await Listing.deleteMany({});
  initData.data = initData.data.map((listing)=>({...listing,
    owner : "698c072819ddc8c9b290e5b5"
  }) );
  await Listing.insertMany(initData.data);
  console.log("Data Saved");
}

initDB();