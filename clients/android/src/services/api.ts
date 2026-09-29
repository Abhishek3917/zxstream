import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const api = axios.create({
    baseURL: "http://192.168.220.34:5001/api/",
});

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("Bearer");
        if(token){
            config.headers.Authorization =`Bearer ${token}`
        }
        return config
    }    
)