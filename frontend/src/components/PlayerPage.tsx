import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";


export default function PlayerPage(){

    const {id}=useParams();


    return (

        <VideoPlayer
            src={`http://localhost:3000/api/video/${id}`}
        />

    )

}