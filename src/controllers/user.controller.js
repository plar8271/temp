import { StatusCodes } from "http-status-codes";
import { 
  bodyToRestuarnt,
  bodyToReview,
  bodyToMission,
  bodyToMyTryingMission
} from "../dtos/user.dto.js";
import { 
  createRestaurant,
  createReview,
  createMission,
  createMyTryingMission
} from "../services/user.service.js";

export const newRestaurant = async (req, res, next) => {
  console.log("가게 추가를 요청했습니다!");
  console.log("body:", req.body);

  const restaurant = await createRestaurant(bodyToRestuarnt(req.body));
  res.status(StatusCodes.OK).json({ result: restaurant });
};

export const newReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

export const newMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await createMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const newMyTryingMission = async (req, res, next) => {
  console.log("내 미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await createMyTryingMission(bodyToMyTryingMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};
