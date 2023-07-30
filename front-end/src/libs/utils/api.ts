import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
});

// Writing interceptor if needed

export default api