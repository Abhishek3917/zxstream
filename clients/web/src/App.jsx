import {Routes,Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Library from "./pages/Library"
import Player from "./pages/Player";
import { useServerStore } from "./store/useServerStore"
import ServerIp from "./pages/ServerIp"
import { setApiBaseUrl } from "./axios/axiosInstance"

const App = ()=>{
  
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  const {serverUrl,isConnected} = useServerStore()
  console.log(isConnected )
  useEffect(() => {
    if (!serverUrl) return
        setApiBaseUrl(serverUrl);
        checkAuth()
  }, [serverUrl,checkAuth]);

  // if(isCheckingAuth && !authUser && !serverUrl){
  //   return(
  //     <div className="flex items-center justify-center h-screen ">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   )
  // }
  return(
    <>
        <div className="flex-none">
      <Navbar/>
      <Routes>
        <Route path='/' element={!isConnected ? <ServerIp /> : authUser?<Navigate to ='/home'/> : <Navigate to='/signup'/>}/>
        <Route path='/home' element={authUser?<Home/>:<Navigate to="/signup"/> }/>
        <Route path='/signup' element={!authUser ? <Signup />:<Navigate to='/'/>} /> 
        <Route path='/login' element={!authUser ? <Login />:<Navigate to='/'/>} />
        <Route path="/library/:id" element={ authUser ? <Library /> : <Navigate to="/login"/>}/>
        <Route path="/watch/:id" element={ authUser ? <Player /> : <Navigate to="/login" />}/>
      </Routes>
        </div>
    </>
  )
}

export default App