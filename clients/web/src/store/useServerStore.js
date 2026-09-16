import { create } from "zustand";
import { setApiBaseUrl } from "../axios/axiosInstance";
import {persist} from "zustand/middleware"

export const useServerStore = create(persist((set) => ({
    serverUrl: "",
    isConnected: false,

    setServerUrl: (url) => {
        set({ serverUrl: url });
            setApiBaseUrl(url)
    },

    setIsConnected: (value) => {
        set({ isConnected: value });
    },
    }),
    {
        name:"server-storage"
    }
));