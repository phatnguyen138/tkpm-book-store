const db = require('../configs/db');

const findAllInventory = async () => {
    const inventory_reports = await db.any(
        'SELECT * FROM inventory_reports ORDER BY inventory_id ASC'
    );
    return inventory_reports;
};

const findInventoryById = async (id) => {
    const inventory_report = await db.oneOrNone(
        'SELECT * FROM inventory_reports WHERE inventory_id = $1',
        id
    );
    return inventory_report;
};

const findInventoryDetailsById = async (id) => {
    const inventory_report_details = await db.any(
        'SELECT * FROM inventory_report_details WHERE inventory_id = $1 ORDER BY inventory_id ASC',
        id
    );
    return inventory_report_details;
};

const createInventory = async (note = null) => {
    const inventory_report = await db.one(
        'INSERT INTO inventory_reports (note) VALUES ($1) RETURNING *',
        note
    );
    return inventory_report;
};

const updateInventory = async (note, id) => {
    const inventory_report = await db.one(
        'UPDATE inventory_reports SET note = $1 WHERE inventory_id = $2 RETURNING *',
        [note, id]
    );
    return inventory_report;
};

const deleteInventory = async (id) => {
    const inventory_report = await db.none(
        'DELETE FROM inventory_reports WHERE inventory_id = $1',
        id
    );
    return inventory_report;
};

const createInventoryDetail = async (
    inventory_id,
    book_id,
    initial_inventory_amount,
    final_inventory_amount
) => {
    const inventory_report_detail = await db.one(
        'INSERT INTO inventory_report_details (inventory_id, book_id, initial_inventory_amount, final_inventory_amount) VALUES ($1, $2, $3, $4) RETURNING *',
        [
            inventory_id,
            book_id,
            initial_inventory_amount,
            final_inventory_amount
        ]
    );
    return inventory_report_detail;
};

const updateInventoryDetail = async (
    inventory_id,
    book_id,
    initial_inventory_amount,
    final_inventory_amount
) => {
    const inventory_report_detail = await db.one(
        'UPDATE inventory_report_details SET initial_inventory_amount = $1, final_inventory_amount = $2 WHERE inventory_id = $3 AND book_id = $4 RETURNING *',
        [
            initial_inventory_amount,
            final_inventory_amount,
            inventory_id,
            book_id
        ]
    );
    return inventory_report_detail;
};
const deleteInventoryDetail = async (inventory_id, book_id) => {
    const inventory_report_detail = await db.none(
        'DELETE FROM inventory_report_details WHERE inventory_id = $1 AND book_id = $2',
        [inventory_id, book_id]
    );
    return inventory_report_detail;
};

module.exports = {
    findAllInventory,
    createInventory,
    findInventoryById,
    findInventoryDetailsById,
    updateInventory,
    deleteInventory,
    createInventoryDetail,
    updateInventoryDetail,
    deleteInventoryDetail
};
