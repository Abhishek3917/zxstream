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
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold">
                        Movie information
                    </h2>
                    <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                        {media.type || "Unknown type"}
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <p className="mb-1 text-slate-400">Title</p>
                        <p className="font-medium text-slate-100">
                            {media.title || "Unknown"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-slate-400">Year</p>
                        <p className="font-medium text-slate-100">
                            {media.year || "Unknown"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-slate-400">Type</p>
                        <p className="font-medium text-slate-100">
                            {media.type || "Unknown"}
                        </p>
                    </div>
                    {media.type?.toLowerCase()==="tv" && (
                        <>
                            <div>
                                <p className="mb-1 text-slate-400">
                                    Season
                                </p>
                                <p className="font-medium text-slate-100">
                                    {media.season || "Unknown"}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-slate-400">
                                    Episode
                                </p>
                                <p className="font-medium text-slate-100">
                                    {media.episode || "Unknown"}
                                </p>
                            </div>
                        </>
                    )}
                    <div>
                        <p className="mb-1 text-slate-400">File size</p>
                        <p className="font-medium text-slate-100">
                            {media.filesize}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-slate-400">Duration</p>
                        <p className="font-medium text-slate-100">
                            {media.duration}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-slate-400">Added on</p>
                        <p className="font-medium text-slate-100">
                            {media.timestamps}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Player;