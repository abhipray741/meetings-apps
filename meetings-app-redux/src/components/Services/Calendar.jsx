import axios from 'axios';
import config from '../../config';
import { getToken } from './Auth';

const BASE_URL = config.BASE_URL;

const getMeetings = async (date) => {

    const url = `${BASE_URL}/calendar?date=${date}`;
    const response = await axios.get(
        url,
        {
            headers : {
                'Authorization': getToken()
            }
        }
    );
    return response.data;
}

export default getMeetings;