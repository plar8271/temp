import { 
  responseFromRestaurant,
  responseFromReview,
  responseFromMission,
  responseFromMyTryingMission
} from "../dtos/user.dto.js";

import {
  addRestaurant,
  getRestaurant,
  addReview,
  getReview,
  addMission,
  getMission,
  getAccount,
  addMyTryingMisson,
  getMyTryingMission
} from "../repositories/user.repository.js";

export const createRestaurant = async (data) => {
  const joinRestaurantId = await addRestaurant({
      name: data.name,
      address: data.address,
      type: data.type,
      create_at: data.create_at,
      phone_number: data.phone_number,
  });

  if (joinRestaurantId === null) {
    throw new Error("이미 존재하는 식당입니다.");
  }

  const restaurant = await getRestaurant(joinRestaurantId);

  return responseFromRestaurant(restaurant);
};

export const createReview = async (data) => {
  const checkRestaurantId = await getRestaurant(data.restaurant_id)
  if(!checkRestaurantId){
    throw new Error("가게가 존재하지 않습니다.");
  }

  const joinReviewId = await addReview({
      restaurant_id: data.restaurant_id,
      account_id: data.account_id,
      score: data.score,
      content: data.content,
      create_at: data.create_at
  });

  const review = await getReview(joinReviewId);

  return responseFromReview(review);
};

export const createMission = async (data) => {
    const joinMissionId = await addMission({
      restaurant_id: data.restaurant_id,
      name: data.name,
      deadline: data.deadline,
      create_at: data.create_at,
      mission_point: data.mission_point
    });

    const mission = await getMission(joinMissionId);

    return responseFromMission(mission);
};

export const createMyTryingMission = async (data) => {
    const account_id = await getAccount(data.account_id);
    const mission_id = await getMission(data.mission_id);

    if(!account_id)
      throw new Error("계정을 찾을 수 없습니다.");
    else if(!mission_id)
      throw new Error("미션을 찾을 수 없습니다.");
    else{
      const joinMyTryingMission = await addMyTryingMisson({
          account_id: data.account_id,
          mission_id: data.mission_id,
          state: data.state,
      });
      if (joinMyTryingMission === null) {
          throw new Error("이미 진행중인 미션입니다.");
      }
      console.log(joinMyTryingMission);
      const myTryingMission = await getMyTryingMission(joinMyTryingMission);
      return responseFromMyTryingMission(myTryingMission);
  }
};