const api_url = "http://localhost:3000"


export function getVideoUrl(id:string){
    return `${api_url}/api/video/${id}`
}


export async function getVideos(){

    const res = await fetch(
        `${api_url}/api/video/list`
    )

    return res.json()
}