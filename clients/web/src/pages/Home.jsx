import { useEffect } from "react";
import LibraryCard from "../components/LibraryCard";
import { useLibraryStore } from "../store/useLibraryStore.js";
import CreateLibrary from "../components/CreateLibrary.jsx";


const Home = () => {
    const {
        libraries,
        getLibraries,
        isLoadingLibraries
    } = useLibraryStore();

    useEffect(() => {
        getLibraries();
    }, [getLibraries]);

    return (
        <div className="min-h-screen">

            <main className="p-6">

                <h1 className="text-3xl font-bold">
                    Welcome 
                </h1>
        
                <section className="mt-8">
                    <CreateLibrary/>

                    <h2 className="text-2xl font-semibold mt-5">
                        Your Libraries
                    </h2>

                    {isLoadingLibraries ? (
                        <p className="mt-4">
                            Loading libraries...
                        </p>
                    ) : libraries.length === 0 ? (
                        <p className="mt-4 opacity-70">
                            No libraries found.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {libraries.map((library) => (
                                <LibraryCard
                                    key={library._id}
                                    library={library}
                                />
                            ))}
                        </div>
                    )}

                </section>

            </main>
        </div>
    );
};

export default Home;