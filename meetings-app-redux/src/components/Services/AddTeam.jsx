import axios from "axios";
import config from '../../config';
import { getToken } from './Auth';

const BASE_URL = config.BASE_URL;

const addTeam = async (team) => {
    const url = `${BASE_URL}/teams`;
    try {
        const response = await axios.post(url, team, {
            headers: {
                'Authorization': getToken()            
            }
        });
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export default addTeam;