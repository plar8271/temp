import { prisma } from "../db.config.js";

//계정 찾기
export const getAccount = async (accountId) => {
  const account = await prisma.account.findUnique({where: {id: accountId}});

  if (!account) {
    return null;
  }

  return account;
};

//내 도전중인 미션에 추가하기
export const addMyTryingMisson = async (data) =>{
  const existMission = await prisma.accountMission.findFirst({
    where: {
      Account_id: data.Account_id,
      Mission_id: data.Mission_id,
    },
  });

  
  if (existMission) {
    return null;
  }

  const MyTryingMission = await prisma.accountMission.create({
    data: {
      Account_id: data.account_id,
      Mission_id: data.mission_id,
      success: data.state,

      account: { connect: { id: data.Account_id }}, 
      mission: { connect: { id: data.Mission_id }}
    },
  });

  return MyTryingMission.id;
}

//내 도전중인 미션 찾기
export const getMyTryingMission = async (accountId) =>{
  const missions = await prisma.accountMission.findMany({where: {Account_id: accountId, success: 'ongoing'}});

  if (missions.length === 0) {
    return null;
  }

  return missions;
}

//내 리뷰 찾기
export const getMyReviews = async (user_id) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {Account_id: user_id}
    });
    return reviews;
  } 
  catch (error) {
    console.error("DB 에러", error);
    throw new Error('Database error');
  }
};
