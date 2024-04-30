// expenseController.js
const Expense = require('../models/expenseModel');
const Users = require('../models/userModel');

// Get all expenses for a user
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;
  console.log(req.body);
  try {
    console.log(userId);

    // Convert the user ID string to ObjectId
    const userIdObj = new ObjectId(userId);

    // Constructing the filter object with the ObjectId user ID
    const filter = { userId: userIdObj };

    // Fetching expenses based on the constructed filter
    const expenses = await Expense.find(filter);
    console.log("Expenses:", expenses); // Log the expenses

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found for the user" });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Getting error", error.message);
  }
};


// Create a new expense
exports.createExpense = async (req, res) => {
  
  // body of the request 
  console.log(req.user.id);
  // console.log(req.body.amount);
  //console.log(req._id);
  const { amount, description, date } = req.body;
  const userId = req.user.id;
  const newExpense = new Expense({
    amount,
    description,
    date,
    userId
  });
  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
    console.log("Created a expense");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing expense
exports.updateExpense = async (req, res) => {
  console.log(req.body.amount);
  try {
    const { id } = req.params;
    const { amount, description, date } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, description, date },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
