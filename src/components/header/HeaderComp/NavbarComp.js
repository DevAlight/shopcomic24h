import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import auth from '../../../firebase';
import { Avatar, Badge, Box, Grid, Menu, MenuItem, Tooltip, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { setModalLogin, saveUserLogin, changeBreadCromd } from '../../../actions/users.action'
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";



const NavbarComp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, cartBag } = useSelector((reduxUser) => reduxUser.userReducer);

    //Sk hien modal login
    const onLoginClick = () => {
        dispatch(setModalLogin(true))
    }
    //Sk hien menu select
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onClick = (event) => {
        if (event === '/') {
            let vBread = [{ name: 'Home', url: '/' },
            ]
            dispatch(changeBreadCromd(vBread))
            navigate(event)
        }
        if (event === '/products') {
            let vBread = [{ name: 'Home', url: '/' },
            { name: 'Product', url: '/products' }]
            dispatch(changeBreadCromd(vBread))
            navigate(event)
        }

    }
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                
                localStorage.removeItem('user', JSON.stringify(null));
                localStorage.removeItem('userVerify', JSON.stringify(null));
                dispatch(saveUserLogin(null));
            })
            .catch((error) => {
                console.error(error);
            })
        handleClose();
    };
    const onCartClick = () => {
        navigate('/cart')
    }
    const handleUser = ()=>{
        navigate('/user')
        handleClose();
    }
    //custom style
    const styleBox = { padding: '5px', color: 'white' }
    const styleLogo = { alignItems: 'center', justifyContent: 'space-around' }
    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 15,
        height: 15,
        backgroundColor: 'red',
        fontSize: '10px'
    }));
    return (
        <Box sx={styleBox}>
            <Grid container sx={{ alignItems: 'center' }}>
                <Grid item xs={6} sm={6}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={6} sm={6}>
                            <Grid container sx={styleLogo}>
                                <img onClick={() => onClick('/')} className="logo-img" src={require('../../../assets/images/pngwing.png')} alt='logo'/>
                                <h5 className="select" onClick={() => onClick('/products')}>PRODUCT</h5>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={6}>                            
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} sm={6} >
                    <Grid container>
                        <Grid item xs={7} sm={7} >
                        </Grid>
                        <Grid item xs={5} sm={5}>
                            <Grid container sx={styleLogo}>
                                <Grid item xs={4} sm={4}>
                                    <Avatar className="icon-header"><i className="fa fa-search itext" aria-hidden="true"></i></Avatar>
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    {user != null ?
                                        <Grid container >
                                            <Tooltip title="Account settings">
                                                <IconButton aria-label="add an alarm"
                                                    onClick={handleClick}
                                                    size="small"
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                >
                                                    <Avatar src={user.photoURL}> </Avatar>
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem >{user.displayName}</MenuItem>
                                                <MenuItem onClick={handleUser}>Thông tin cơ bản</MenuItem>
                                                <MenuItem onClick={handleLogout}>Đăng suất</MenuItem>
                                                {/* other menu items */}
                                            </Menu>
                                        </Grid>
                                        :
                                        <Avatar className="icon-header" onClick={onLoginClick}><i className="fa fa-user" aria-hidden="true"></i></Avatar>

                                    }
                                </Grid>
                                <Grid item xs={4} sm={4}>
                                    {user ?
                                        <Badge
                                            onClick={onCartClick}
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right', margin: '1px' }}
                                            badgeContent={
                                                <SmallAvatar alt={cartBag.length.toLocaleString()} src="/static/images/avatar/1.jpg" />
                                            }>
                                            <Avatar className="icon-header" alt="CartShop"><i className="fa fa-shopping-bag" aria-hidden="true"></i></Avatar>
                                        </Badge>
                                        : <Badge
                                            onClick={onLoginClick}
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'top', horizontal: 'right', margin: '1px' }}
                                            badgeContent={
                                                <SmallAvatar alt="0" src="/static/images/avatar/1.jpg" />
                                            }>
                                            <Avatar className="icon-header" alt="CartShop"><i className="fa fa-shopping-bag" aria-hidden="true"></i></Avatar>
                                        </Badge>}

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >


    )
}
export default NavbarComp