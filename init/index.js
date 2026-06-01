let mongoose = require("mongoose");
let intdata = require("./data.js");
let listing = require("../models/listening.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

let intdb = async () => {
  await listing.deleteMany({});
  intdata=intdata.data.map((obj) => {
    return {
      ...obj,
      owner: '6994f362962518d37549283e'
    };
  });
  
  await listing.insertMany(intdata);
  console.log("data was initialized");

};

intdb();
