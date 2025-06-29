import mongoose from "mongoose";
import foodModel from "../Models/FoodModel.js";

const addFood = async (req, res) => {
  try {
    // checking if item is real
    const {name,category,price} = req.body 
    if (!name||!category||!price) {
      return res.status(400).send({ 
        message: "All fields are required: name, price and category" 
      });
    }

    const food = {
      name: name,
      price: price,
      category: category,
    };

      // adding food
        const newFood = await foodModel.create(food);
        await food.save()
  return res.status(201).json({message:"food added successfully",data:food})
      } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "An error occurred while adding the food item",
      error: error.message,
    });
  }
};

const getFoods = async (req, res) => {
    try {
      // Fetch all food items from the database
      const foods = await foodModel.find({});
      if(!foods) return res.status({message:"food items not found"})
      // Return the list of food items
      return res.status(200).send({ 
        message: "Food items retrieved successfully", 
        data: foods 
      });
    } catch (error) {
      console.error(error);
      // Return error response
      return res.status(500).send({ 
        message: "An error occurred while retrieving food items", 
        error: error.message 
      });
    }
  };
const findFoodById = async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ 
          message: "ID is required to find a food item" 
        });
      }
  
      const food = await foodModel.findById(id);
  
      if (!food) {
        return res.status(404).send({ 
          message: "The food item was not found" 
        });
      }
  
      return res.status(200).json({ 
        message: "Food item retrieved successfully", 
        data: food 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "An error occurred while finding a food item",
        error: error.message,
      });
    }
  };
    

  const updateFoodById = async (req, res) => {
    try {
      const { id, name, price, category, image } = req.body;
  
      // Validate the provided ID
      if (!id) {
        return res.status(400).send({
          message: "ID is required to update a food item",
        });
      }
  
      // Validate the fields to update
      if (!name && !price && !category && !image) {
        return res.status(400).send({
          message: "At least one field (name, price, category, image) must be provided to update",
        });
      }
  
      // Build the update object dynamically
      const updates = {};
      if (name) updates.name = name;
      if (price) updates.price = price;
      if (category) updates.category = category;
      if (image) updates.image = image;
  
      // Find and update the food item
      const updatedFood = await foodModel.findByIdAndUpdate(
        id, 
        { $set: updates }, 
        { new: true } 
      );
  
      // Check if the food item was found
      if (!updatedFood) {
        return res.status(404).send({
          message: "The food item was not found",
        });
      }
  
      // Return the updated food item
      return res.status(200).send({
        message: "Food item updated successfully",
        data: updatedFood,
      });
    } catch (error) {
      console.error(error);
      // Return error response
      return res.status(500).send({
        message: "An error occurred while updating the food item",
        error: error.message,
      });
    }
  };
  const deleteFoodItem = async (req, res) => {
    try {
      const { id } = req.body;
  
      if (!id) {
        return res.status(400).send({ 
          message: "ID is required to delete a food item" 
        });
      }
  
      const food = await foodModel.findByIdAndDelete(id);
  
      if (!food) {
        return res.status(404).send({ 
          message: "The food item was not found or already deleted" 
        });
      }
  
      return res.status(200).send({ 
        message: "Food item deleted successfully", 
        data: food 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ 
        message: "An error occurred while trying to delete the food item", 
        error: error.message 
      });
    }
  };
  
export {addFood,getFoods,findFoodById,updateFoodById,deleteFoodItem};
