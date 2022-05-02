import axios from "axios";
import config from "../../config";
import { getToken } from "./Auth";

const BASE_URL = config.BASE_URL;

const fetchMeeting = async (searchInfo) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/meetings?period=${searchInfo.day}&search=${searchInfo.desc}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: getToken(),
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export default fetchMeeting;
