import { extractMetadata } from "./metadata.service.js";

const filePath = "D:\\Media\\Movies\\Interstellar.mkv";

try {

    const metadata = await extractMetadata(filePath);

    console.log(
        JSON.stringify(metadata, null, 2)
    );

} catch (error) {

    console.error(
        "Metadata extraction failed:",
        error
    );
}