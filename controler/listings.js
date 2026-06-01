const listing = require("../models/listening.js");
module.exports.index=async (req, res) => {
    let allListings = await listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

  module.exports.newlisting=(req, res) => {
    res.render("listings/new.ejs");
  }

  module.exports.showlisting=async (req, res) => {
    let { id } = req.params;
    let list = await listing.findById(id)
    .populate({path:"rev",
      populate: {path:"author",
      },
    }).populate("owner");
    
    res.render("listings/show.ejs", { list });
    
  }

  // module.exports.createlisting=async (req, res) => {
  //   req.flash("success", "Listing created successfully!");

  //   let { title, description, image, price, location, country } = req.body;

  //   let listings = new listing({
  //     title:title,
  //     description:description,
  //     image: {
  //       filename: "listingimage",
  //       url: image,
  //     },
  //     price:price,
  //     location:location,
  //     country:country,
  //   });
  //   listings.owner=req.user;
  //   await listings.save();
  //   res.redirect("/listing");
  // }

  module.exports.createlisting = async (req, res) => {
    req.flash("success", "Listing created successfully!");
  
    let { title, description, price, location, country } = req.body;
  
    let listings = new listing({
      title,
      description,
      price,
      location,
      country,
    });
  
    // ✅ THIS IS THE FIX
    if (req.file) {
      listings.image = {
        url: req.file.path,        // local path OR cloudinary URL
        filename: req.file.filename,
      };
    }
  
    listings.owner = req.user;
  
    await listings.save();
    res.redirect("/listing");
  };

  // module.exports.createlisting = async (req, res) => {
  //   req.flash("success", "Listing created successfully!");
  
  //   let { title, description, price, location, country } = req.body;
  
  //   let listings = new listing({
  //     title:title,
  //     description:description,
  //     price: price,
  //     location:location,
  //     country:country,
  //   });
  
  //   // ✅ HANDLE FILE FROM MULTER
  //   if (req.file) {
  //     listings.image = {
  //       url: req.file.path,       // Cloudinary URL
  //       filename: req.file.filename,
  //     };
  //   }
  
  //   listings.owner = req.user._id;
  
  //   await listings.save();
  //   res.redirect("/listing");
  // };

  
  module.exports.editlisting=async (req, res) => {
    let { id } = req.params;
    let getlisting = await listing.findById(id);
    res.render("listings/edit.ejs", { getlisting });
  }

  // module.exports.updatelisting=async (req, res) => {
  //   let { id } = req.params;
  //   let { title, description, image, price, location, country } = req.body;

  //   await listing.findByIdAndUpdate(
  //     id,
  //     {
  //       title,
  //       description,
  //       image: {
  //         filename: "listingimage",
  //         url: image,
  //       },
  //       price,
  //       location,
  //       country,
  //     },
  //     { runValidators: true, new: true }
  //   );

  //   req.flash("success", "Listing update successfully!");
  //   res.redirect(`/listing/${id}`);
  // }


  module.exports.updatelisting = async (req, res) => {
    let { id } = req.params;
    let { title, description, price, location, country } = req.body;
  
    let updatedData = {
      title,
      description,
      price,
      location,
      country,
    };
  
    // ✅ handle new uploaded image
    if (req.file) {
      updatedData.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }
  
    await listing.findByIdAndUpdate(id, updatedData, {
      runValidators: true,
      new: true,
    });
  
    req.flash("success", "Listing update successfully!");
    res.redirect(`/listing/${id}`);
  };

  module.exports.destroylisting=async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Delete successfully!");
    res.redirect("/listing");
  }