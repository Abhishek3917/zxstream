import { useAuthStore } from "../store/useAuthStore"

const Navbar =()=>{
const {authUser,logout} = useAuthStore()

    return(
<div className="navbar bg-base-600 shadow-lg">
  <div className="flex-1">
    <a href="/" className="btn btn-ghost text-xl">ZxStream</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
        {authUser &&(
            <li className="text-xl">
                <a onClick={logout}>logout</a>
            </li>
        )}
        {!authUser &&(
            <>
                <li className="text-xl"><a href="/login">login</a></li>
                <li className="text-xl"><a href="/signup">Signup</a></li>
            </>
        )}
    </ul>
  </div>
</div>
    )
}

export default Navbar