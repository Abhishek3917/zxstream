import { useParams } from "react-router-dom";

const Player = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-2xl font-bold">
                Player
            </h1>

            <p className="mt-4">
                Media ID: {id}
            </p>
        </div>
    );
};

export default Player;