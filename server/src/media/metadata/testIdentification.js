import {identifyMedia} from "./identification.service.js";
const files = [
    "Interstellar.2014.1080p.BluRay.x264.mkv",
    "Inception.2010.1080p.mkv",
    "Breaking.Bad.S01E01.720p.mkv",
    "Breaking.Bad.S02E05.1080p.WEB-DL.mkv",
    "The.Last.of.Us.S01E03.1080p.mkv"
];
for (const file of files) {

    console.log("\nFILE:", file);

    console.log(
        identifyMedia(file)
    );
}

