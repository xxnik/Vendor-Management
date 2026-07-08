const prisma = require("../config/prisma");

const createVendor = async (req, res) => {
  console.log("Vendor API hit");
  try {
    const { name, phone, userId } = req.body;
    if (!name?.trim() || !userId) {
      return res.status(400).json({
        success: false,
        message: "Name and userId are required",
      });
    }

    const vendor = await prisma.Vendor.create({
      data: {
        name: name.trim(),
        phone,
        userId,
      },
    });

    res.json({
      success: true,
      message: "vendor added successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add vendor",
      error: error.message,
    });
  }
};

const getVendor = async (req, res) => {
  console.log("you have hit the api");

  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const vendor = await prisma.Vendor.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      message: "Got all the vendor",
      vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vendors",
      error: error.message,
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { name, phone } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required",
      });
    }
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Vendor name is required",
      });
    }

    const vendor = await prisma.Vendor.update({
      where: { id: vendorId },
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
      },
    });

    res.json({
      success: true,
      message: "Vendor updated successfully",
      vendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update vendor",
      error: error.message,
    });
  }
};

const deleteVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID is required",
      });
    }

    await prisma.$transaction([
      prisma.initialStock.deleteMany({ where: { vendorId } }),
      prisma.leftoverStock.deleteMany({ where: { vendorId } }),
      prisma.report.deleteMany({ where: { vendorId } }),
      prisma.vendor.delete({ where: { id: vendorId } }),
    ]);

    res.json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete vendor",
      error: error.message,
    });
  }
};

module.exports = {createVendor,getVendor,updateVendor,deleteVendor};
