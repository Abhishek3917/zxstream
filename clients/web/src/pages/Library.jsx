import {useParams} from 'react-router-dom'
import { useLibraryStore } from '../store/useLibraryStore';
const Library =()=>{
    const {id} = useParams()
    const { scanLibrary } = useLibraryStore();
    const handleScan = async () => {
            await scanLibrary(id);
        };
    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold">
                Library
            </h1>

            <p className="mt-4">
                Library ID: {id}
                
            </p>
            <button onClick={handleScan} className='btn btn-primary mt-6'>Scan Library</button>
        </div>
    );
}
export default Library