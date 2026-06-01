const listing=require("../models/listening.js");
const reviews=require("../models/Reviews.js");

module.exports.postreview=async(req,res)=>{
    let {id}=req.params;
    let {rating,comment}=req.body;
    let findlisting=await listing.findById(id);
    let newReviews=new reviews({
        rating:rating,
        comments:comment,
    })
    newReviews.author=req.user.id;
    console.log(newReviews);
    // console.log(findlisting);
    findlisting.rev.push(newReviews);
    await newReviews.save();
    await findlisting.save();
    console.log("new review saved");
    req.flash("success", "Review created successfully!");
    res.redirect(`/listing/${id}`)


 }

 module.exports.deletereview=async (req, res) => {
    let { id } = req.params;
    let reviewId = req.params.reviewId.trim();
  
    // 🔥 remove reviewId from listing.rev array
    await listing.findByIdAndUpdate(id, {
      $pull: { rev: reviewId }
    });
  
    // 🔥 delete review document
    await reviews.findByIdAndDelete(reviewId);
    req.flash("success", "Delete Review successfully!");
  
    res.redirect(`/listing/${id}`);
  }