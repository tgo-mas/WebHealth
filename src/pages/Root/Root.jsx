import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";

export function Root(){
    return(
        <div>
            <Menu />
            <Outlet/>
        </div>
    );
}