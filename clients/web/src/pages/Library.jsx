import {useParams} from 'react-router-dom'
import { useLibraryStore } from '../store/useLibraryStore';
import { useMediStore } from '../store/useMediaStore';
import { useEffect } from 'react';
const Library =()=>{
    const {id} = useParams()
    const { scanLibrary } = useLibraryStore();
    const {media,getMedia,isLoadingMedia} = useMediStore()
    const handleScan = async () => {
            await scanLibrary(id);
            await getMedia(id)
        };

        useEffect(()=>{
            getMedia(id)
        },[id]);
    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold">
                Library
            </h1>

            <p className="mt-4">
                Library ID: {id}
                
            </p>
            <button onClick={handleScan} className='btn btn-primary mt-6'>Scan Library</button>
            <h2 className='text-2xl font-bold mt-8'>Media</h2>
            {isLoadingMedia?(
                <p className='mt-4'>Loading media</p>
            ): media.legth === 0?(
                <p className='mt-4'> no media Found</p>
            ):(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {media.map((item) => (
                        <div key={item._id} className="card bg-base-200">
                            <div className="card-body">
                                <h3 className="card-title">
                                    {item.title}
                                </h3>
                                <p>
                                    {item.type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Library