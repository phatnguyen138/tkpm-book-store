const db = require('../configs/db');

// Find all bills
const findAll = async () => {
  const query = 'SELECT * FROM bill';
  const bills = await db.any(query);
  return bills;
};

// Find a bill by ID
const findById = async (id) => {
  const query = 'SELECT * FROM bill WHERE bill_id = $1';
  const values = [id];
  const result = await db.oneOrNone(query, values);
  return result;
};

// Create a new bill
const create = async (bill) => {
  const { fullname, email, phone, address, total_amount } = bill;
  const query =
    'INSERT INTO bill (fullname, email, phone, address, total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [fullname, email, phone, address, total_amount];
  const result = await db.query(query, values);
  return result;
};

// Update a bill by ID
const update = async (id, bill) => {
  const { fullname, email, phone, address, total_amount } = bill;
  const query =
    'UPDATE bill SET fullname = $1, email = $2, phone = $3, address = $4, total_amount = $5 WHERE bill_id = $6 RETURNING *';
  const values = [fullname, email, phone, address, total_amount, id];
  const result = await db.query(query, values);
  return result;
};

// Delete a bill by ID
const remove = async (id) => {
  const query = 'DELETE FROM bill WHERE bill_id = $1 RETURNING *';
  const values = [id];
  const result = await db.query(query, values);
  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: remove
};
