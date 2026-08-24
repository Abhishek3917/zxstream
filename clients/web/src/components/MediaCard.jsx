const MediaCard = ({ media, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="card bg-base-200 shadow-sm cursor-pointer hover:bg-base-300">
            <div className="card-body">
                <h2 className="card-title">
                    {media.title}
                </h2>
                <p>
                    {media.year}
                </p>
                <p className="text-sm opacity-70">
                    {media.type}
                </p>
            </div>
        </div>
    );
};

export default MediaCard;z