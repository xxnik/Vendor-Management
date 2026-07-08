const prisma = require("../config/prisma");

const getDateRange = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(year, month - 1, day, 23, 59, 59, 999);
  return { start, end };
};

const createOrUpdateInitialStock = async (req, res) => {
  try {
    const { vendorId, userId, date, stocks } = req.body;

    if (!vendorId || !userId || !date || !stocks) {
      return res.status(400).json({
        success: false,
        message: "vendorId, userId, date, and stocks are required",
      });
    }

    const { start, end } = getDateRange(date);

    const existing = await prisma.initialStock.findFirst({
      where: {
        vendorId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    if (existing) {
      const updated = await prisma.initialStock.update({
        where: { id: existing.id },
        data: { stocks },
      });

      return res.json({
        success: true,
        message: "Initial stock updated successfully",
        initialStock: updated,
      });
    }

    const created = await prisma.initialStock.create({
      data: {
        vendorId,
        userId,
        date: start,
        stocks,
      },
    });

    return res.json({
      success: true,
      message: "Initial stock saved successfully",
      initialStock: created,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to save initial stock",
      error: error.message,
    });
  }
};

const getInitialStock = async (req, res) => {
  try {
    const { vendorId, date } = req.params;

    if (!vendorId || !date) {
      return res.status(400).json({
        success: false,
        message: "vendorId and date are required",
      });
    }

    const { start, end } = getDateRange(date);

    const initialStock = await prisma.initialStock.findFirst({
      where: {
        vendorId,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    if (!initialStock) {
      return res.json({
        success: true,
        message: "No initial stock found",
        initialStock: null,
      });
    }

    return res.json({
      success: true,
      message: "Initial stock fetched successfully",
      initialStock,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch initial stock",
      error: error.message,
    });
  }
};

module.exports = {
  createOrUpdateInitialStock,
  getInitialStock,
};
