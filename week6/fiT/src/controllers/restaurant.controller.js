import { StatusCodes } from "http-status-codes";
import { bodyToRestuarnt } from "../dtos/restaurant.dto.js";
import { createRestaurant } from "../services/restaurant.service.js";
import { findMissionOfRestaurant } from '../services/restaurant.service.js'

export const newRestaurant = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);
  
    const restaurant = await createRestaurant(bodyToRestuarnt(req.body));
    res.status(StatusCodes.OK).json({ result: restaurant });
  };

export const readmissionOfRestaurant = async (req, res, next) => {
    const restaurantId = req.params.restaurant_id;
    const missionOfRestaurant = await findMissionOfRestaurant(restaurantId);  
  
    if (missionOfRestaurant.success) {
      const response = JSON.parse(
        JSON.stringify(missionOfRestaurant.data, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value))
      res.status(StatusCodes.OK).json({ result: response});  
    }
    else {
      res.status(StatusCodes.NOT_FOUND).json({ message: missionOfRestaurant.message })
    }
  }