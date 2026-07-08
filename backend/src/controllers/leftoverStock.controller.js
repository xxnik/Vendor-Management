const prisma = require("../config/prisma");

const getDateRange = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day, 23, 59, 59, 999);
  return { start, end };
};

const createOrUpdateLeftoverStock = async (req, res) => {
  try {
    const { vendorId, userId, date, stocks } = req.body;

    if (!vendorId || !userId || !date || !stocks) {
      return res.status(400).json({
        success: false,
        message: "vendorId, userId, date, and stocks are required",
      });
    }

    const { start, end } = getDateRange(date);

    const existing = await prisma.leftoverStock.findFirst({
      where: {
        vendorId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    if (existing) {
      const updated = await prisma.leftoverStock.update({
        where: { id: existing.id },
        data: { stocks },
      });

      return res.json({
        success: true,
        message: "Leftover stock updated successfully",
        leftoverStock: updated,
      });
    }

    const created = await prisma.leftoverStock.create({
      data: {
        vendorId,
        userId,
        date: start,
        stocks,
      },
    });

    return res.json({
      success: true,
      message: "Leftover stock saved successfully",
      leftoverStock: created,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to save leftover stock",
      error: error.message,
    });
  }
};

const getLeftoverStock = async (req, res) => {
  try {
    const { vendorId, date } = req.params;

    if (!vendorId || !date) {
      return res.status(400).json({
        success: false,
        message: "vendorId and date are required",
      });
    }

    const { start, end } = getDateRange(date);

    const leftoverStock = await prisma.leftoverStock.findFirst({
      where: {
        vendorId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    if (!leftoverStock) {
      return res.json({
        success: true,
        message: "No leftover stock found",
        leftoverStock: null,
      });
    }

    return res.json({
      success: true,
      message: "Leftover stock fetched successfully",
      leftoverStock,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leftover stock",
      error: error.message,
    });
  }
};

module.exports = {
  createOrUpdateLeftoverStock,
  getLeftoverStock,
};
