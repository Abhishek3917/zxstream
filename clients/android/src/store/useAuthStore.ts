import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";

type User = {
    _id:string
    email: string;
};
type loginData={
    email:string,
    password:string
}
type AuthState = {
    authUser: User | null;
    isLoggingIn: boolean;
    isCheckingAuth: boolean;

    login: (data:loginData) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({

    authUser: null,
    isLoggingIn: false,
    isCheckingAuth: true,

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await api.post("/auth/login",data);
            console.log(res.data)
            const { token ,user} = res.data;
            // Store JWT securely
            console.log(user)
            await SecureStore.setItemAsync("Bearer",token);
            set({authUser: user});
            return true
            
        } catch (error) {
            console.log("Login error:", error);
            return false
            
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        await SecureStore.deleteItemAsync("Bearer");
        set({
            authUser: null,
        });
    },

    checkAuth: async () => {
        try {
            const token = await SecureStore.getItemAsync("Bearer");
            if (!token) {
                set({
                    authUser: null,
                    isCheckingAuth: false,
                });
                return;
            }
            const res = await api.get("/auth/session");
            set({
                authUser: res.data,
            });
        } catch (error) {
            console.log("Check auth error:", error);
            await SecureStore.deleteItemAsync("Bearer");
            set({
                authUser: null,
            });

        } finally {
            set({
                isCheckingAuth: false,
            });
        }
    },
}));