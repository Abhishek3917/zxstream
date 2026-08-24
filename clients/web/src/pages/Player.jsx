import { useParams } from "react-router-dom";

const Player = () => {
    const { id } = useParams();

    const streamUrl = `http://localhost:5001/api/stream/${id}`;

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">
                Player
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