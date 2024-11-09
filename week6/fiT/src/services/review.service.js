import { responseFromReview } from "../dtos/review.dto.js";
import { getRestaurant } from "../repositories/restaurant.repository.js";
import {
    addReview,
    getReview
} from "../repositories/review.repository.js";

export const createReview = async (data) => {
    const checkRestaurantId = await getRestaurant(data.restaurant_id)
    if(!checkRestaurantId){
      throw new Error("가게가 존재하지 않습니다.");
    }
  
    const joinReviewId = await addReview({
        id: data.id,
        restaurant_id: data.restaurant_id,
        account_id: data.account_id,
        score: data.score,
        content: data.content,
        created_date: data.created_date
    });
  
    const review = await getReview(joinReviewId);
  
    return responseFromReview(review);
  };