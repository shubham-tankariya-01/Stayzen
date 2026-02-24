const mongoose = require("mongoose");
const Schema = mongoose.Schema;// for easy access
const Review = require("../Models/review.js");

const listingSchema = new Schema({ 
     
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image : {
       filename : {
        type : String
       },
       url : {
        type : String,
        default : "Deafult Link for Defualt and Null condition",
        set : (v)=> v==="" ? "Default Link" : v
       }
    },
    price : {
        type : Number
    },
    location : {
        type : String 
    },
    country : {
        type : String
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : "Review"
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
    

})

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({
          _id : { $in : listing.reviews}
        });
    }
})

const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;