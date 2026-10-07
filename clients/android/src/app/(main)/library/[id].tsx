import { useState } from "react";
import {
    View,
    Text,
    Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useLibraryStore } from "@/store/useLibraryStore";

export default function Library() {
    const {scanLibrary}= useLibraryStore()
    const { id } = useLocalSearchParams<{ id: string }>();

    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        try {
            setIsScanning(true);

            const result = await scanLibrary(id);

            console.log("Scan result:", result);

        } catch (error) {
            console.log("Scan error:", error);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <View>
            <Text>Library</Text>

            <Text>Library ID: {id}</Text>

            <Pressable onPress={handleScan} disabled={isScanning}>
                <Text>
                    {isScanning ? "Scanning..." : "Scan Library"}
                </Text>
            </Pressable>
        </View>
    );
}