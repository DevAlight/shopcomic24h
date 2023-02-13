import { Container } from "@mui/material"
import NavbarComp from "./HeaderComp/NavbarComp";
import ModalLogin from '../Modal/ModalLogin';
import ModalOrder from "../Modal/ModalOrder";

const Header = () => {
    
    return (

        <div className="bg-header">
            <NavbarComp/>
            <ModalLogin/>
            <ModalOrder/>
        </div>
    )
}

export default Header