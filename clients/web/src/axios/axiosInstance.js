import axios from "axios";

export const axiosInstances = axios.create({baseURL:"",withCredentials:true})

export const setApiBaseUrl =(serverUrl)=>{
    axiosInstances.defaults.baseURL = `http://${serverUrl}:5001/api/`;
}