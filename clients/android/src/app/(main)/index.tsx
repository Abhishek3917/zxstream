import { useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { useLibraryStore } from "../../store/useLibraryStore";

export default function Home() {
    const {
        libraries,
        isLoading,
        fetchLibraries,
    } = useLibraryStore();

    useEffect(() => {
        fetchLibraries();
    }, []);

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator />
                <Text>Loading libraries...</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>My Libraries</Text>

            {libraries.map((library) => (
                <Pressable
                    key={library._id}
                    onPress={() =>
                        router.push({
                            pathname: "/library/[id]",
                            params: {
                                id: library._id,
                            },
                        })
                    }
                >
                    <View>
                        <Text>{library.name}</Text>
                        <Text>{library.type}</Text>
                        <Text>{library.path}</Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
}