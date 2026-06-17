import { getVideoUrl } from "./api/VideoApi";
import { VideoPlayer } from "./components/VideoPlayer";
import './App.css'
export default function App(){

  return(
    <>
      
      <VideoPlayer src={getVideoUrl("movie")} />
    </>
  )
}