import { useState } from "react"
import { useLibraryStore } from "../store/useLibraryStore"

const CreateLibrary = ()=>{
    const {createLibrary} = useLibraryStore()
    const [formData,setFormData]=useState({
        name:"",
        type:"",
        path:""
    })

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await createLibrary(formData)

        setFormData({
            name:"",
            type:"",
            path:""
        })
    }
         return (
        <form
            onSubmit={handleSubmit}
            className="card bg-base-200 p-6 max-w-md"
        >
            <h2 className="text-xl font-bold mb-4">
                Create Library
            </h2>

            <div className="mb-4">
                <label className="label">
                    Library Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Movies"
                    required
                />
            </div>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select select-bordered w-full"
                required >
                <option value="" disabled>
                    Select library type
                </option>
                <option value="movie">
                    Movies
                </option>

                <option value="tv">
                    TV Shows
                </option>
            </select>

            <div className="mb-4">
                <label className="label">
                    Library Path
                </label>

                <input
                    type="text"
                    name="path"
                    value={formData.path}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="/media/movies"
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
            >
                Create Library
            </button>
        </form>
    )
}

export default CreateLibrary
