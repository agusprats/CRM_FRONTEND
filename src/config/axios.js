import axios from 'axios';

const axiosClient = axios.create({
    baseURL:'http://localhost:4001'
});

export default axiosClient;