import axios from "axios";
import config from '../../config';
import { getToken } from './Auth';

const BASE_URL = config.BASE_URL;

const fetchUsers = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/users`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': getToken()                },
            }
        );
        return response.data;
        // setTeams(teamsresponse);
    } catch (error) {
        alert(error.message);
    }
};

export default fetchUsers;
