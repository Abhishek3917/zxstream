import { useState } from 'react'
import {useAuthStore} from '../store/useAuthStore.js'
const Signup = ()=>{
    const {signup,isSigningUp} = useAuthStore()
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        signup(formData)
    }

    return(
        <div className='max-h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-full max-w-md p-6'>
                <h1 className='text-2xl font-bold mb-6'>
                    Create Account
                </h1>
                <div className='mb-4'>
                    <label className='label'>
                        Email
                    </label>
                    <input type="email"
                            name = "email"
                            value={formData.email}
                            onChange={handleChange}
                            className='input input-bordered w-full'
                            placeholder='example@email.com'
                            required />
                </div>
                <div className='mb-4'>
                    <label className='label'>
                        password
                    </label>
                    <input type="password"
                            name = "password"
                            value={formData.password}
                            onChange={handleChange}
                            className='input input-bordered w-full'
                            placeholder='........'
                            required />
                </div>
                <button type="submit" className='btn btn-primary w-full' disabled={isSigningUp}>
                    {isSigningUp? "Creating Account....." : "Signup"}
                </button>
            </form>
        </div>
    )
}

export default Signup