const express = require("express");
const router = express.Router();

const {createVendor,getVendor,updateVendor,deleteVendor}=require("../controllers/vendor.controller");

router.post("/create",createVendor);
router.get("/user/:userId",getVendor);
router.put("/:vendorId",updateVendor);
router.delete("/:vendorId",deleteVendor);

module.exports=router