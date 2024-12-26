import {Button} from "@/components/ui/button.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "@/context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const Home = ()=>{
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token'))
            navigate('/login');
    }, []);

    const {logout} = useContext(AuthContext);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await logout();
        navigate("/login");
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Button>Logout</Button>
            </form>
        </div>
    );
}

export {Home};