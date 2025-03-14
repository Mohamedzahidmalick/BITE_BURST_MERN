const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = 'mongodb+srv://MohamedZahidMalick:BiteBurstmern@cluster0.tohjf.mongodb.net/BiteBurstmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");

    // Access the collections directly
    const fetched_Data = mongoose.connection.db.collection("food_items");
    const foodCategory = mongoose.connection.db.collection("foodCategory");

    // Fetch data from the "food_items" collection
    const data = await fetched_Data.find({}).toArray();

    // Fetch data from the "foodCategory" collection
    const CategoryData = await foodCategory.find({}).toArray();

    // Assign fetched data to global variables
    global.food_items = data;
    global.foodCategory = CategoryData;


  } catch (error) {
    // Handle connection errors
    console.error("MongoDB connection error:", error);
  }
};

// Export the mongoDB function
module.exports = mongoDB;
