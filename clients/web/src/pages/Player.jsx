import { useParams } from "react-router-dom";
import { useServerStore } from "../store/useServerStore";
import { useState,useEffect } from "react";
import { axiosInstances, setApiBaseUrl } from "../axios/axiosInstance";

const Player = () => {
    const { id } = useParams();
    const {serverUrl} = useServerStore()

    const [media, setMedia] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!serverUrl || !id) return;

        setApiBaseUrl(serverUrl);

        const getMedia = async () => {
            try {
                const response = await axiosInstances.get(`/media/${id}`);
                setMedia(response.data);
            } catch (error) {
                console.error("Error loading media:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getMedia();
    }, [serverUrl, id]);

    const streamUrl = `http://${serverUrl}:5001/api/stream/${id}`;

    if (isLoading) {
        return (
            <div className="min-h-screen p-6">
                <p>Loading movie...</p>
            </div>
        );
    }

    if (!media) {
        return (
            <div className="min-h-screen p-6">
                <p>Movie not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">
                {media.title}
            </h1>

            <video
                controls
                className="w-full max-w-5xl mx-auto"
                src={streamUrl}
            >
                Your browser does not support video playback.
            </video>
        </div>
    );
};

export default Player;