
import { useNavigate} from "react-router-dom";
import { useServerStore } from "../store/useServerStore";
import { setApiBaseUrl } from "../axios/axiosInstance";

const ServerIp = () => {
    const {serverUrl,setServerUrl,setIsConnected} = useServerStore();
    const navigate = useNavigate()
    const handleChange = (e) => {
        setServerUrl(e.target.value);
    }; 
    const handleUrl =()=>{
        console.log(serverUrl)
        setApiBaseUrl(serverUrl)
        setIsConnected(true)
        navigate("/home")
    }
    return (
        <div className="flex flex-col gap-4 max-w-auto justify-center items-center m-5">
            <input
                type="text"
                value={serverUrl}
                onChange={handleChange}
                placeholder="http://192.168.220.40:5001"
                className="input input-bordered "
            />

            <button className="btn btn-primary " onClick={handleUrl}>
                Connect
            </button>
        </div>
    );
};

export default ServerIp;