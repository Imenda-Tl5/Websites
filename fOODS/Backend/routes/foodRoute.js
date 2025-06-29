import express, { Router } from "express"
import {addFood,getFoods,findFoodById,updateFoodById,deleteFoodItem} from "../controllers/foodController.js"
const foodRouter = express.Router()



foodRouter.post("/add",addFood)
foodRouter.get("/get", getFoods);
foodRouter.get("/get/:id", findFoodById);
foodRouter.put("/update", updateFoodById);
foodRouter.delete("/delete", deleteFoodItem);


export default foodRouter