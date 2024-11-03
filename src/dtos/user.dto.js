export const bodyToRestuarnt = (body) => {
    const create_at = new Date();
  
    return {
      name: body.name,
      address: body.address,
      type: body.type || "",
      create_at,
      phone_number: body.phone_number || "",
    };
};

export const responseFromRestaurant = (restaurant) => {
   return {
      name: restaurant.name,
      address: restaurant.address,
      type: restaurant.type || "",
      create_at: restaurant.create_at,
      phone_number: restaurant.phone_number || ""
    };
};

export const bodyToReview = (body) => {
  const create_at = new Date();

  return {
      restaurant_id: body.restaurant_id,
      account_id: body.account_id,
      score: body.score,
      content: body.content,
      create_at
  };
};

export const responseFromReview = (review) => {
    return {
      restaurant_id: review.restaurant_id,
      account_id: review.account_id,
      score: review.score,
      content: review.content,
      create_at: review.create_at
    };
};

export const bodyToMission = (body) => {
  const create_at = new Date();
  const deadline = new Date(body.deadline)

  return {
      restaurant_id: body.restaurant_id,
      name: body.name,
      deadline,
      create_at,
      mission_point: body.mission_point
  };
};

export const responseFromMission = (mission) => {
    return {
      restaurant_id: mission.restaurant_id,
      name: mission.name,
      deadline: mission.deadline,
      create_at: mission.deadline,
      mission_point: mission.mission_point
    };
};

export const bodyToMyTryingMission = (body)=>{
    return{
        account_id: body.account_id,
        mission_id: body.mission_id,
        state: body.state || "ongoing",
    };
};

export const responseFromMyTryingMission = (myTryingMission) => {
    return {
        account_id: myTryingMission.account_id,
        mission_id: myTryingMission.mission_id,
        state: myTryingMission.state,
    };
};