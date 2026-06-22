import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



type Video = {
    id: string;
    title: string;
    url: string;
};


export default function VideoGrid() {

    const [videos, setVideos] = useState<Video[]>([]);


    useEffect(() => {

        fetch("http://localhost:3000/api/video/list")
            .then(res => res.json())
            .then(data => setVideos(data))
            .catch(err => console.log(err));

    }, []);



    return (

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4 max-w-7xl mx-auto " >
            {
                videos.map(video => (

                    <Link
                        key={video.id}
                        to={`/player/${video.id}`}
                        className=" bg-slate-900 w-full p-8 rounded-3xl shadow-lg hover:bg-slate-700 transition duration-300 hover:scale-105 " >

                        <h1>
                            {video.id}
                        </h1>

                        <h1 className=" mt-3 text-2xl font-semibold text-slate-100"
                        >
                            {video.title}
                        </h1>


                        <h2 className=" mt-2 text-slate-300 text-sm "
                        >
                            MP4 Video
                        </h2>


                        <div className="mt-5 text-blue-500"
                        >
                            Watch
                        </div>
                    </Link>

                ))
            }

        </div>

    );
}