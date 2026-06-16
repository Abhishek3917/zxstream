const api_url = "http://localhost:3000"

export function getVideoUrl(id:string){
    return `${api_url}/api/video/${id}`
}