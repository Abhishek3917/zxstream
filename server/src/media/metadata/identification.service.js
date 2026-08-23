import ptt from 'parse-torrent-title'
import path from 'path'

export const identifyMedia = (filePath)=>{
    const fileName = path.basename(
        filePath,
        path.extname(filePath)
    )

// console.log(Object.keys(ptt))

    const fileParser = ptt.parse(fileName)
    const isTV = fileParser.season !== undefined || fileParser.episode !== undefined;
    const type = isTV ? "tv" : "movie";

    return {
        fileName,
        title: fileParser.title,
        type,
        year: fileParser.year,
        season: fileParser.season,
        episode: fileParser.episode
    }
    
}