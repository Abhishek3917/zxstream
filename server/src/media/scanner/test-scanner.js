import { scanDirectory } from "./scanner.service.js";

const files = await scanDirectory(
    "C:\\Users\\abhis\\OneDrive\\Desktop\\movies"
);

console.log(files);