
    const mongoose = require("mongoose");
    const review=require("./Reviews.js");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    filename: {
      type: String,
      default: "listin",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108d",
      set: v =>
        v === ""
          ? "https://images.unsplash.com/photo-1501117716987-c8e1ecb2108d"
          : v,
    },
  },

  price: Number,
  location: String,
  country: String,

  rev:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Review' 
  }],
  owner:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
    

  
});

listingSchema.post("findOneAndDelete",async(listingData)=>{
if(listingData.rev.length){
  let deletereview = await review.deleteMany({ _id: { $in: listingData.rev } });
  console.log(deletereview);

}

})
                               //modal name
module.exports = mongoose.model("listing", listingSchema);


