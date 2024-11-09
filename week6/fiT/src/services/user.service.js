import { responseFromMyTryingMission } from "../dtos/user.dto.js";
import { getMission } from "../repositories/mission.repository.js";
import { 
  getAccount,
  addMyTryingMisson,
  getMyTryingMission,
  getMyReviews,
} from "../repositories/user.repository.js";

//내가 하고 있는 미션 생성
export const createMyTryingMission = async (data) => {
    const account_id = await getAccount(data.account_id);
    const mission_id = await getMission(data.mission_id);

    if(!account_id)
      throw new Error("계정을 찾을 수 없습니다.");
    else if(!mission_id)
      throw new Error("미션을 찾을 수 없습니다.");
    else{
      const joinMyTryingMission = await addMyTryingMisson({
          Account_id: data.account_id,
          Mission_id: data.mission_id,
          success: data.state
      });
      if (joinMyTryingMission === null) {
          throw new Error("이미 진행중인 미션입니다.");
      }
      console.log(joinMyTryingMission);
      const myTryingMission = await getMyTryingMission(joinMyTryingMission);
      return responseFromMyTryingMission(myTryingMission);
  }
};

//아이디를 받아 해당 리뷰들 읽어오기
export const readReviews = async (userId) => {
  try {
    const reviewlist = await getMyReviews(userId);

    if (reviewlist.length === 0) {
      return {
        success: false,
        message: "리뷰를 찾을 수 없습니다."
      };
    }

    return {
      success: true,
      data: reviewlist,
    };
  } 
  catch (error) {
    console.error("리뷰 찾는 과정에서 에러 발생", error);
    return {
      success: false,
      message: "리뷰 찾는 과정에서 에러 발생"
    };
  }
};

export const findMyTryingMissions = async (userId) => {
  try {
    const missions = await getMyTryingMission(userId);  

    if (missions.length === 0) {
      return { success: false, message: "진행중인 미션 없음" };
    }

    return { success: true, data: missions };
  } 
  catch (error) {
    console.error('진행중 미션 찾는 중 에러 발생:', error);
    return { success: false, message: "진행중 미션 찾는 중 에러 발생" };
  }
};