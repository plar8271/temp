import { responseFromMission } from "../dtos/mission.dto.js";
import { 
    addMission,
    getMission
} from "../repositories/mission.repository.js";

export const createMission = async (data) => {
    const joinMissionId = await addMission({
      restaurant_id: data.restaurant_id,
      mission_name: data.name,
      deadline: data.deadline,
      created_date: data.create_at,
      mission_point: data.mission_point
    });

    const mission = await getMission(joinMissionId);

    return responseFromMission(mission);
};