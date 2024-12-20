import axios from 'axios';

const fetchClient = axios.create({
    baseURL: 'http://localhost:5000',
});

export default fetchClient;
