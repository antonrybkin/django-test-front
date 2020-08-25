import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const httpClient = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Token 21c8325472dc5ffebac39f8d1bac30ab83e8aae0"
    }
});

export default httpClient;