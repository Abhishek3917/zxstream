import { api } from "./api";

export const getLibraries = async () => {
    const res = await api.get("/libraries");
    return res.data;
};

export const scanLibrary = async (libraryId: string) => {
    const res = await api.post(
        `/libraries/${libraryId}/scan`
    );

    return res.data;
};