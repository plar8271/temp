import { pool } from "../db.config.js";

// 식당 추가
export const addRestaurant = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM restaurant WHERE restaurant_name = ? AND address = ?) as isExistRestaurant;`,
      [data.name, data.address]
    );

    if (confirm[0].isExistRestaurant) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO restaurant (restaurant_name, address, type, created_date, phone_number) VALUES (?, ?, ?, ?, ?);`,
      [
        data.name,
        data.address,
        data.type,
        data.create_at,
        data.phone_number
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

//가게 정보 찾기
export const getRestaurant = async (restaurantId) => {
  const conn = await pool.getConnection();

try {
  const [restaurant] = await pool.query(`SELECT * FROM restaurant WHERE id = ?;`, restaurantId);

  console.log(restaurant);

  if (restaurant.length == 0) {
    return null;
  }

  return restaurant;
} catch (err) {
  throw new Error(
    `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
  );
} finally {
  conn.release();
}
};

// 리뷰 추가하기
export const addReview = async(data)=>{
  const conn = await pool.getConnection();

    try{
      const [review] = await pool.query(
          `INSERT INTO review (Restaurant_id, Account_id, score, content, created_date) VALUES (?, ?, ?, ?, ?);`,
          [
            data.restaurant_id,
            data.account_id,
            data.score,
            data.content,
            data.create_at
          ]
        );

        return review.insertId;
    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
          );
    }finally{
        conn.release();   //db 연결을 해제
    }
}

// 리뷰 찾기
export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

	try {
	  const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);
	
	  console.log(review);
	
	  if (review.length == 0) {
	    return null;
	  }
	
	  return review;
	} catch (err) {
	  throw new Error(
	    `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
	  );
	} finally {
	  conn.release();
	}
};

//미션 추가하기
export const addMission = async (data) =>{
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO mission (Restaurant_id, mission_name, deadline, created_date, mission_point) VALUES (?, ?, ?, ?, ?);`,
      [
        data.restaurant_id,
        data.name,
        data.deadline,
        data.create_at,
        data.mission_point
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();   //db 연결을 해제
  }
}

//미션 찾기
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  } 
};

export const getAccount = async (accountId) => {
  const conn = await pool.getConnection();

  try {
    const [account] = await pool.query(`SELECT * FROM account WHERE id = ?;`, accountId);

    console.log(account);

    if (account.length == 0) {
      return null;
    }

    return account;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  } 
};

export const addMyTryingMisson = async (data) =>{
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM account_mission WHERE Account_id= ? and Mission_id = ?) AS isExist;`,
      [ 
        data.account_id, 
        data.mission_id 
      ]
    );

    if (confirm[0].isExist !== 1) {
      return null;
    }
    console.log(data);
    const [result] = await pool.query(
      `INSERT INTO account_mission (Account_id, Mission_id, success) VALUES (?, ?, ?);`,
      [
        data.account_id,
        data.mission_id,
        data.state,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}

export const getMyTryingMission = async (accountId) =>{
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM account_mission WHERE Account_id = ?;`, accountId);

    console.log(mission);

    if (mission.length != 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  } 
}
