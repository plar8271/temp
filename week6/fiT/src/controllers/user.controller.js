import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { bodyToMyTryingMission } from "../dtos/user.dto.js";
import { createMyTryingMission } from "../services/user.service.js";
import { createReview } from "../services/review.service.js";
import { readReviews} from "../services/user.service.js";
import { findMyTryingMissions } from '../services/user.service.js';

export const newReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

export const newMyTryingMission = async (req, res, next) => {
  console.log("내 미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await createMyTryingMission(bodyToMyTryingMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const readMyReviewList = async (req, res, next) => {
  const userId = req.params.user_id;
  const result = await readReviews(userId);

  if (result.success){
    const response = JSON.parse(  //Bigint return 문제 해결위한 코드
      JSON.stringify(result.data, (key, value) => 
      typeof value === 'bigint' ? value.toString() : value)
    );
    res.status(StatusCodes.OK).json({ reviewList: response });

  }
};

export const readMyTryingMissions = async (req, res, next) => {
  const userId = req.params.user_id; 
  const result = await findMyTryingMissions(userId);

  if (result.success) {
    const response = JSON.parse(
      JSON.stringify(result.data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value)
    )
    res.status(StatusCodes.OK).json({missionList: response});
  }
};