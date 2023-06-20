import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function Home(){
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return(
        <>
            <h1 className="mt-3">Bem-vindo(a) ao WebHealth!</h1>
        </>
    )

}