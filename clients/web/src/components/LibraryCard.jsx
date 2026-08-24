import { useNavigate } from "react-router-dom";

const LibraryCard = ({ library }) => {
    const navigate = useNavigate()
    
    const handleOpen = ()=>{ 
        navigate(`/library/${library._id}`)
    }
    return (
        <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">
                    {library.name}
                </h2>

                <p className="text-sm opacity-70">
                    {library.path}
                </p>

                <div className="card-actions justify-end">
                    <button onClick={handleOpen} className="btn btn-primary">
                        Open
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LibraryCard;