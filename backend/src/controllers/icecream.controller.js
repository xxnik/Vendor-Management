const prisma = require("../config/prisma");

const createIcecream = async (req, res) => {
  try {
    const { name, price, userId } = req.body;

    if (!name?.trim() || price === undefined || price === null || !userId) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and userId are required",
      });
    }

    const icecream = await prisma.icecream.create({
      data: {
        name: name.trim(),
        price: Number(price),
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Icecream created successfully",
      icecream,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUserIcecreams = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const icecreams = await prisma.icecream.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      icecreams,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteUserIcecream = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }
    await prisma.icecream.delete({
      where: {
        id: userId,
      },
    });
    return res.json({
      success: true,
      message: "Deleted icecream successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateUserIcecream = async (req, res) => {
  console.log(req.body);
  try {
    const {id, name, price, userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    await prisma.icecream.update({
      where: {
        id,
      },
      data: {
        name,
        price,
      },
    });

    res.json({
    success:true,
    message:"user updated successfully"
  })
  } catch (error) {}
  return res.json({
    success: false,
    message: "Internal server Error",
    
  });
  
};

module.exports = {
  createIcecream,
  getUserIcecreams,
  deleteUserIcecream,
  updateUserIcecream,
};
