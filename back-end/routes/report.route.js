const reportRoute = require('express').Router();
const reportController = require('../controllers/report.controller');
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndAdminStaff
} = require('../middlewares/auth');

reportRoute
    .get(
        '/inventory',
        verifyTokenAndAdminStaff,
        reportController.getInventoryReports
    )
    .get(
        '/inventory/:id',
        verifyTokenAndAdminStaff,
        reportController.getInventoryReportById
    )
    .get(
        '/inventory/:id/details',
        verifyTokenAndAdminStaff,
        reportController.getInventoryReportDetails
    )
    .post(
        '/inventory/:id/details',
        verifyTokenAndAdminStaff,
        reportController.createInventoryReportDetail
    )
    .put(
        '/inventory/:id/details/:bookid',
        verifyTokenAndAdminStaff,
        reportController.updateInventoryReportDetail
    )
    .delete(
        '/inventory/:id/details/:bookid',
        verifyTokenAndAdminStaff,
        reportController.deleteInventoryReportDetail
    )
    .post(
        '/inventory',
        verifyTokenAndAdminStaff,
        reportController.createInventoryReport
    )
    .put(
        '/inventory/:id',
        verifyTokenAndAdminStaff,
        reportController.updateInventoryReport
    )
    .delete(
        '/inventory/:id',
        verifyTokenAndAdminStaff,
        reportController.deleteInventoryReport
    );

module.exports = reportRoute;
