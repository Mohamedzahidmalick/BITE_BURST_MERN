const mongoose = require('mongoose');

const mongoDB = async () => {
  try {

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    const fetched_Data =
      mongoose.connection.db.collection("food_items");

    const foodCategory =
      mongoose.connection.db.collection("foodCategory");


    const data = await fetched_Data.find({}).toArray();

    const CategoryData = await foodCategory.find({}).toArray();


    global.food_items = data;
    global.foodCategory = CategoryData;

    console.log("Food data loaded successfully!");

  } catch (error) {

    console.error("MongoDB connection error:", error);

  }
};


module.exports = mongoDB;