
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Link } from "@mui/material";


const BreadcrumbBar = () => {
    const { bread } = useSelector((reduxUser) => reduxUser.userReducer);

    const styleBread = {
        color:'white',
        fontSize:'20px',
        marginLeft:'10%'
    }
    return (
        <Breadcrumbs sx={styleBread} separator="›">
            {bread.map((val, inx) => {
                return (
                    <Link key={inx} href={val.url} color="inherit">
                        {val.name}
                    </Link >
                )
            })}
        </Breadcrumbs>
    )
}
export default BreadcrumbBar