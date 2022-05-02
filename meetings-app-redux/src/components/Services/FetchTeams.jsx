import axios from "axios";
import config from "../../config";
import { getToken } from "./Auth";

const BASE_URL = config.BASE_URL;

const fetchTeams = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/teams`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken(),
            },
        });
        return response.data;
    
    } catch (error) {
        return error;
    }
};

export default fetchTeams;
