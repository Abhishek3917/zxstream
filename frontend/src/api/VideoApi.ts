const api_url = "http://privateip():3000"

export function getVideoUrl(id:string){
    return `${api_url}/api/video/${id}`
}