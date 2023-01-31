import { Container, Box, Grid , List, ListSubheader, ListItemIcon, ListItemButton, ListItemText } from "@mui/material"
import { changeBreadCromd } from '../actions/users.action';
import BreadcrumbBar from "../components/Breadcrumb/BreadcrumbBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserInfoBacsic from "../components/body/userInfo/UserInfo";
import OrderList from "../components/body/userInfo/OrderList";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const UserInfo = () => {
    const dispatch = useDispatch();
    // const {  userVerify } = useSelector((reduxUser) => reduxUser.userReducer);
    // const saveUser = JSON.parse(localStorage.getItem("user", "[]")) || [];
    const [page, setPage] = useState(<UserInfoBacsic />)
    //chuyển đổi trang
    const onClickSwitch = (value) => {
        if (value === 'user') {
            setPage(<UserInfoBacsic />)
        }
        if (value === 'order') {
            setPage(<OrderList />)
        }
    }
    //hàm khi load
    useEffect(() => {
        let vBread = [{ name: 'Home', url: '/' },
        { name: 'UserInfo', url: '/user' }]
        dispatch(changeBreadCromd(vBread))
    }, []);
    const styleBox = {
        borderRadius: '15px',
        padding: "2%",
        margin: "1%",
        backgroundColor: 'white'
    }
    const styleContainer = {
        justifyContent: 'space-around',
        padding: "1%"
    }
    return (
        <div className="homePage">
            <Header />
            <Container maxWidth='xxl'>
                <Box className="banner-img2">
                    <BreadcrumbBar />
                </Box>
                <Grid container sx={{ backgroundColor: '#F5F5F5' }}>
                    <Grid item md={12} sm={12}>
                        <Grid container sx={styleContainer}>
                            <Grid item md={3} sm={6} mt={1}>
                                <Box sx={styleBox} >
                                    <List
                                        subheader={<ListSubheader>Thông tin</ListSubheader>}
                                    >
                                        <ListItemButton onClick={() => onClickSwitch('user')}>
                                            <ListItemIcon>
                                                <i className="fa-solid fa-house-user"></i>
                                            </ListItemIcon>
                                            <ListItemText primary='Thông tin cơ bản' />
                                        </ListItemButton>
                                        <ListItemButton onClick={() => onClickSwitch('credit')}>
                                            <ListItemIcon>
                                                <i className="fa-regular fa-credit-card"></i>
                                            </ListItemIcon>
                                            <ListItemText primary='Phương thức thanh toán' />
                                        </ListItemButton>
                                        <ListItemButton onClick={() => onClickSwitch('order')}>
                                            <ListItemIcon>
                                                <i className="fa-solid fa-box-tissue"></i>
                                            </ListItemIcon>
                                            <ListItemText primary='Các đơn hàng' />
                                        </ListItemButton>
                                    </List>

                                </Box>
                            </Grid>
                            <Grid item md={9} sm={6}>
                                {page}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>

    )
}

export default UserInfo