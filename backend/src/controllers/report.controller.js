const prisma = require("../config/prisma");

const createReport = async (req, res) => {
  try {
    const {
      vendorId,
      userId,
      date,
      initialStock,
      leftoverStock,
      totalSale,
      vendorCommission,
      companyProfit,
    } = req.body;

    if (!vendorId || !userId || !date) {
      return res.status(400).json({
        success: false,
        message: "vendorId, userId, and date are required",
      });
    }

    const [year, month, day] = date.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day, 0, 0, 0, 0);

    const existing = await prisma.report.findUnique({
      where: {
        vendorId_date: {
          vendorId,
          date: dateObj,
        },
      },
    });

    if (existing) {
      const updated = await prisma.report.update({
        where: { id: existing.id },
        data: {
          initialStock: initialStock || {},
          leftoverStock: leftoverStock || {},
          totalSale: Number(totalSale) || 0,
          vendorCommission: Number(vendorCommission) || 0,
          companyProfit: Number(companyProfit) || 0,
        },
      });

      return res.json({
        success: true,
        message: "Report updated successfully",
        report: updated,
      });
    }

    const created = await prisma.report.create({
      data: {
        vendorId,
        userId,
        date: dateObj,
        initialStock: initialStock || {},
        leftoverStock: leftoverStock || {},
        totalSale: Number(totalSale) || 0,
        vendorCommission: Number(vendorCommission) || 0,
        companyProfit: Number(companyProfit) || 0,
      },
    });

    return res.json({
      success: true,
      message: "Report saved successfully",
      report: created,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to save report",
      error: error.message,
    });
  }
};

const getReportsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const { userId } = req.query;

    if (!date || !userId) {
      return res.status(400).json({
        success: false,
        message: "date and userId are required",
      });
    }

    const [year, month, day] = date.split("-").map(Number);
    const start = new Date(year, month - 1, day, 0, 0, 0, 0);
    const end = new Date(year, month - 1, day, 23, 59, 59, 999);

    const reports = await prisma.report.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
        userId,
      },
      include: {
        vendor: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

const getReportsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const { userId } = req.query;

    if (!startDate || !endDate || !userId) {
      return res.status(400).json({
        success: false,
        message: "startDate, endDate, and userId are required",
      });
    }

    const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
    const [endYear, endMonth, endDay] = endDate.split("-").map(Number);

    const start = new Date(startYear, startMonth - 1, startDay, 0, 0, 0, 0);
    const end = new Date(endYear, endMonth - 1, endDay, 23, 59, 59, 999);

    const reports = await prisma.report.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
        userId,
      },
      include: {
        vendor: true,
      },
      orderBy: { date: "asc" },
    });

    const reportsByVendor = {};
    const vendorIds = new Set();

    reports.forEach((report) => {
      vendorIds.add(report.vendorId);
      if (!reportsByVendor[report.vendorId]) {
        reportsByVendor[report.vendorId] = {
          vendor: report.vendor,
          reports: [],
          totalSale: 0,
          totalVendorCommission: 0,
          totalCompanyProfit: 0,
        };
      }
      const vendorData = reportsByVendor[report.vendorId];
      vendorData.reports.push(report);
      vendorData.totalSale += Number(report.totalSale) || 0;
      vendorData.totalVendorCommission += Number(report.vendorCommission) || 0;
      vendorData.totalCompanyProfit += Number(report.companyProfit) || 0;
    });

    const overallTotalSale = reports.reduce((sum, r) => sum + (Number(r.totalSale) || 0), 0);
    const overallVendorCommission = reports.reduce((sum, r) => sum + (Number(r.vendorCommission) || 0), 0);
    const overallCompanyProfit = reports.reduce((sum, r) => sum + (Number(r.companyProfit) || 0), 0);

    return res.json({
      success: true,
      reportsByVendor: Object.values(reportsByVendor),
      overallTotalSale,
      overallVendorCommission,
      overallCompanyProfit,
      totalReports: reports.length,
      totalVendors: vendorIds.size,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getReportsByDate,
  getReportsByDateRange,
};
