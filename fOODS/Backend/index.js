import express from "express";
import foodModel from "./Models/FoodModel.js";
import cors from "cors"
import { connectToDB} from "./config/DB.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to DB
connectToDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET,POST,DElETE,PUT"],
  allowedHeaders:["Content-Type","Authorization"]
}))
// adding food to server
app.post("/add", async (req, res) => {
  try {
    const { name, count,category, price } = req.body;
    
    if (!name || !category || !price || !count) {
      return res.status(400).json({ message: "All fields (name, category, price) are required." });
    }

    const food = await foodModel.create({
      name: name,
      category: category,
      price: price,
      count:count
    });

    return res.json({
      message: "Food item added successfully",
      data: food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred while adding the food item",
      error: error.message,
    });
  }
});

// getting all food Items
app.get("/get", async (req, res) => {
  try {
    const foodList = await foodModel.find({});
    return res.json({ data: foodList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred while fetching food items",
      error: error.message,
    });
  }
});

// getting a specific food Item
app.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.json({
      message: "Food item retrieved successfully",
      data: food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred while fetching the food item",
      error: error.message,
    });
  }
});

// updtaing a food item
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;

    if (!name && !category && !price) {
      return res.status(400).json({
        message: "At least one field (name, category, price) must be provided to update",
      });
    }

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { $set: { name, category, price } },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.json({
      message: "Food item updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred while updating the food item",
      error: error.message,
    });
  }
});

// deleting food
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFood = await foodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    return res.json({
      message: `the food ${deletedFood.name} was deleted successfully`,
      data: deletedFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error occurred while deleting the food item",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
