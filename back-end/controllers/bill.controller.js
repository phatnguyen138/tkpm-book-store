const Bill = require('../models/bill.model');

// Get all bills
const getBills = async (req, res) => {
  try {
    const bills = await Bill.findAll();
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a bill by ID
const getBillById = async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    if (bill) {
      res.status(200).json(bill);
    } else {
      res.status(404).json({ message: 'Bill not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new bill
const createBill = async (req, res) => {
  const { fullname, email, phone, address, total_amount } = req.body;
  try {
    const bill = await Bill.create({ fullname, email, phone, address, total_amount });
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a bill by ID
const updateBill = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, phone, address, total_amount } = req.body;
  try {
    const updatedBill = await Bill.update(id, { fullname, email, phone, address, total_amount });
    if (updatedBill) {
      res.status(200).json(updatedBill);
    } else {
      res.status(404).json({ message: 'Bill not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a bill by ID
const deleteBill = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBill = await Bill.delete(id);
    if (deletedBill) {
      res.status(200).json({ message: 'Bill deleted successfully' });
    } else {
      res.status(404).json({ message: 'Bill not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill
};
