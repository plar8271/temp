import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import { getMissionOfRestaurant} from "../repositories/restaurant.repository.js"
import {
    addRestaurant,
    getRestaurant
} from "../repositories/restaurant.repository.js"


export const createRestaurant = async (data) => {
    const joinRestaurantId = await addRestaurant({
        restaurant_name: data.restaurant_name,
        address: data.address,
        type: data.type,
        created_date: data.created_date,
        phone_number: data.phone_number,
    });
  
    if (joinRestaurantId === null) {
      throw new Error("이미 존재하는 식당입니다.");
    }
  
    const restaurant = await getRestaurant(joinRestaurantId);
  
    return responseFromRestaurant(restaurant);
  };

export const findMissionOfRestaurant = async (restaurantId) => {
    try {
      const missionlist = await getMissionOfRestaurant(restaurantId);  
  
      // 미션이 없다면 실패 응답
      if (missionlist.length === 0) {
        return {
          success: false,
          message: '해당 식당에 미션이 없습니다.',
        };
      }
  
      return {
        success: true,
        data: missionlist,  
      };
    } 
    catch (error) {
      console.error("해당 식당의 미션 찾는 중 오류 발생", error);  
      return {
        success: false,
        message: "해당 식당의 미션 찾는 중 오류 발생",
      };
    }
  };