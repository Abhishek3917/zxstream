import {Routes,Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Library from "./pages/Library"

const App = ()=>{
  
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen ">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }
  return(
    <>
        <div className="flex-none">
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to="/signup"/> }/>
        <Route path='/signup' element={!authUser ? <Signup />:<Navigate to='/'/>} /> 
        <Route path='/login' element={!authUser ? <Login />:<Navigate to='/'/>} />
        <Route path="/library/:id" element={ authUser ? <Library /> : <Navigate to="/login" />}/>
      </Routes>
        </div>
    </>
  )
}

export default App