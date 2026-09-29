import { useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
} from "react-native";

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
                <View key={library._id}>
                    <Text>{library.name}</Text>
                    <Text>{library.type}</Text>
                </View>
            ))}
        </View>
    );
}