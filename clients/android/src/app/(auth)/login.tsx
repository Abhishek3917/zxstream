import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../store/useAuthStore";

export default function Login() {
    const {login,isLoggingIn} = useAuthStore()
    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const handleLogin = async () => {
        const success = await login(formdata)
        if (success) {
            router.replace("/(main)");
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={formdata.email}
                onChangeText={(text) =>
                    setFormData({
                        ...formdata,
                        email: text,
                    })
                }
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                value={formdata.password}
                onChangeText={(text) =>
                    setFormData({
                        ...formdata,
                        password: text,
                    })
                }
            />

            <Pressable onPress={handleLogin} disabled={isLoggingIn}>
                <Text>
                    {isLoggingIn ? "Logging in..." : "Login"}
                </Text>
            </Pressable>
        </View>
    );
}