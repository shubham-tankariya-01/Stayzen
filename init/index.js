const mongoose = require("mongoose");
const initData = require("./sampleData.js");
const Listing = require("../Models/listing.js");
const User = require("../Models/user.js");

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
  await User.deleteOne({ username: "demouser" });

  let newDemoUser = new User({
    username: "demouser",
    email: "demo@stayzen.com",
    userInfo: {
      firstName: "Demo",
      lastName: "Host"
    }
  });
  
  let registeredUser = await User.register(newDemoUser, "demopassword");

  initData.data = initData.data.map((listing)=>({...listing,
    owner : registeredUser._id
  }) );
  await Listing.insertMany(initData.data);
  console.log("Data Saved with Demo Host (demouser / demopassword)");
}

initDB().then(() => {
    mongoose.connection.close();
});