import axios from "axios";
import Constants from "../constants";

const apiClient = axios.create({
    // Later read this URL from an environment variable
    method: "POST",
    headers: {
        'content-type': 'application/json'
    },
    baseURL: Constants.API_URL
});

export default apiClient;