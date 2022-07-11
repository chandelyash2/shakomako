import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://shakomakoapp.com'
});

export default instance;