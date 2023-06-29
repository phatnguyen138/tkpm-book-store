const reportModel = require('../models/report.model');
const userModel = require('../models/user.model');
const bookModel = require('../models/book.model');
const { Error } = require('../helpers/error.helper');

const getInventoryReports = async (req, res, next) => {
    try {
        const reports = await reportModel.findAllInventory();
        const user_id = req.user_id;
        for (const report of reports) {
            // get user details for each report
            const { fullname, email, address, phone } =
                await userModel.findById(user_id);
            report.user = { user_id, fullname, email, address, phone };

            // get report details for each report
            const report_details = await reportModel.findInventoryDetailsById(
                report.inventory_id
            );
            report.details = report_details;
        }
        return res.status(200).json({
            success: true,
            data: {
                reports
            }
        });
    } catch (error) {
        return next(error);
    }
};

const getInventoryReportById = async (req, res, next) => {
    try {
        const inventory_id = req.params.id;
        const user_id = req.user_id;
        // find by id
        const report = await reportModel.findInventoryById(inventory_id);
        // get user details
        const { fullname, email, address, phone } = await userModel.findById(
            user_id
        );
        report.user = { user_id, fullname, email, address, phone };
        // get report details
        const report_details = await reportModel.findInventoryDetailsById(
            inventory_id
        );
        report.details = report_details;
        return res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        return next(error);
    }
};

const createInventoryReport = async (req, res, next) => {
    try {
        const { note } = req.body;
        const report = await reportModel.createInventory(note);
        return res.status(201).json({
            success: true,
            data: report
        });
    } catch (error) {
        return next(error);
    }
};

const updateInventoryReport = async (req, res, next) => {
    try {
        const { note } = req.body;
        const inventory_id = req.params.id;
        const report = await reportModel.updateInventory(note, inventory_id);
        return res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        return next(error);
    }
};

const deleteInventoryReport = async (req, res, next) => {
    try {
        const inventory_id = req.params.id;
        await reportModel.deleteInventory(inventory_id);
        return res.status(200).json({
            success: true
        });
    } catch (error) {
        return next(error);
    }
};

const getInventoryReportDetails = async (req, res, next) => {
    try {
        const inventory_id = req.params.id;
        const report = await reportModel.findInventoryById(inventory_id);
        if (!report) return next(new Error(400, 'Report not found'));
        const user_id = req.user_id;
        // get user details for each report
        const { fullname, email, address, phone } = await userModel.findById(
            user_id
        );
        report.user = { user_id, fullname, email, address, phone };

        // get report details for each report
        const report_details = await reportModel.findInventoryDetailsById(
            report.inventory_id
        );
        report.details = report_details;
        // get all book details
        for (const item of report.details) {
            const book = await bookModel.findBookById(item.book_id);
            item.book = book;
        }
        return res.status(200).json({
            success: true,
            data: {
                report
            }
        });
    } catch (error) {
        return next(error);
    }
};

const createInventoryReportDetail = async (req, res, next) => {
    try {
        const inventory_id = req.params.id;
        if (!inventory_id) return next(new Error(400, 'Report not found'));
        const { book_id, initial_inventory_amount, final_inventory_amount } =
            req.body;
        if (!book_id || !initial_inventory_amount || !final_inventory_amount)
            return next(new Error(400, 'Missing fields'));
        const report = await reportModel.createInventoryDetail(
            inventory_id,
            book_id,
            initial_inventory_amount,
            final_inventory_amount
        );
        return res.status(201).json({
            success: true,
            data: report
        });
    } catch (error) {
        return next(error);
    }
};

const updateInventoryReportDetail = async (req, res, next) => {
    try {
        const inventory_id = req.params.id;
        const book_id = req.params.bookid;
        const getReport = await reportModel.findInventoryById(inventory_id);
        if (!getReport) return next(new Error(400, 'Report not found'));
        const book = await bookModel.findBookById(book_id);
        if (!book) return next(new Error(400, 'Book not found'));
        const { initial_inventory_amount, final_inventory_amount } = req.body;
        if (!initial_inventory_amount || !final_inventory_amount)
            return next(new Error(400, 'Missing fields'));
        const report = await reportModel.updateInventoryDetail(
            inventory_id,
            book_id,
            initial_inventory_amount,
            final_inventory_amount
        );
        return res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        return next(error);
    }
};

const deleteInventoryReportDetail = async (req, res, next) => {
    try {
        const inventory_id = req.params.id;
        const book_id = req.params.bookid;
        const getReport = await reportModel.findInventoryById(inventory_id);
        if (!getReport) return next(new Error(400, 'Report not found'));
        const book = await bookModel.findBookById(book_id);
        if (!book) return next(new Error(400, 'Book not found'));
        const { initial_inventory_amount, final_inventory_amount } = req.body;
        if (!initial_inventory_amount || !final_inventory_amount)
            return next(new Error(400, 'Missing fields'));
        await reportModel.deleteInventoryDetail(inventory_id, book_id);
        return res.status(201).json({
            success: true
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getInventoryReports,
    getInventoryReportById,
    createInventoryReport,
    updateInventoryReport,
    deleteInventoryReport,
    getInventoryReportDetails,
    createInventoryReportDetail,
    updateInventoryReportDetail,
    deleteInventoryReportDetail
};
