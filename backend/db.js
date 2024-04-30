const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB is Connected..');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process on error
  }
};

module.exports = connectDB;
