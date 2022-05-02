import axios from "axios";
import config from "../../config";
import { getToken } from "./Auth";

const addMeeting=async (meeting)=>{
  
    const response = await axios.post(
        `${config.BASE_URL}/meetings`,
        meeting,
        {
            headers:{
                Authorization:getToken()
            }
        }
    );
    return response.data;
    
};
export default addMeeting;