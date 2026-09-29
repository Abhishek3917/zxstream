import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function Index() {
    const {
        authUser,
        isCheckingAuth,
        checkAuth,
    } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return null;
    }

    if (authUser) {
        return <Redirect href="/(main)" />;
    }

    return <Redirect href="/(auth)/login" />;
}