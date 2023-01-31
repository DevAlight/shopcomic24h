import { Card, CardMedia, Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModalLogin, addProductToCartHandler, changeBreadCromd } from '../../actions/users.action'


const IntroHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState();
    const { user, quantity } = useSelector((reduxUser) => reduxUser.userReducer);
    const saveData = JSON.parse(localStorage.getItem("item", "[]")) || [];
    const onClickSeemore = () => {
        let vBread = [{ name: 'Home', url: '/' },
        { name: 'Product', url: '/products' }]
        dispatch(changeBreadCromd(vBread))
        navigate('/products')
    }
    const onBuyNowClick = (event) => {
        if (user) {
            if (saveData[0] === undefined) {
                const ProductAdd = [{ Product: event, quantity: quantity }]
                localStorage.setItem("item", JSON.stringify(ProductAdd));
                //lưu dữ liệu sản phẩm đã chọn vào local storage
                dispatch(addProductToCartHandler(ProductAdd));
            }
            else {
                let i = saveData.findIndex((el) => el.Product._id === event._id)
                if (i !== -1) {
                    saveData[i].quantity++;
                    // đẩy dữ liệu các sản phẩm lên local storage
                    localStorage.setItem("item", JSON.stringify(saveData));
                    dispatch(addProductToCartHandler(saveData));
                }
                else {
                    const ProductAdd = [{ Product: event, quantity: quantity }, ...saveData];
                    localStorage.setItem("item", JSON.stringify(ProductAdd));
                    //lưu dữ liệu sản phẩm đã chọn vào local storage
                    dispatch(addProductToCartHandler(ProductAdd));
                }
            }
            navigate('/cart')
        }
        else {
            dispatch(setModalLogin(true))
        }
    }
    const onAddCartClick = (event) => {
        if (user) {
            if (saveData[0] === undefined) {
                const ProductAdd = [{ Product: event, quantity: quantity }]
                localStorage.setItem("item", JSON.stringify(ProductAdd));
                //lưu dữ liệu sản phẩm đã chọn vào local storage
                dispatch(addProductToCartHandler(ProductAdd));
            }
            else {
                let i = saveData.findIndex((el) => el.Product._id === event._id)
                if (i !== -1) {
                    saveData[i].quantity++;
                    // đẩy dữ liệu các sản phẩm lên local storage
                    localStorage.setItem("item", JSON.stringify(saveData));
                    dispatch(addProductToCartHandler(saveData));
                }
                else {
                    const ProductAdd = [{ Product: event, quantity: quantity }, ...saveData];
                    localStorage.setItem("item", JSON.stringify(ProductAdd));
                    //lưu dữ liệu sản phẩm đã chọn vào local storage
                    dispatch(addProductToCartHandler(ProductAdd));
                }
            }
        }
        else {
            dispatch(setModalLogin(true))
        }
    }
    const onClickDetail = (even) => {        
        navigate(`/products/${even._id}`)
    }
    useEffect(() => {
        // Gọi API sau khi trang được tải        
        const fetchData = async () => {
            setTimeout(async () => {
                const response = await fetch('https://backend-shop24h.up.railway.app/products-limit?type=Action&limit=7');
                const data = await response.json();
                // Xử lý dữ liệu
                setData(data.data)
            }, 2000); // Delay 2 giây (2000 milliseconds)
        };
        fetchData();

    }, []);

    const styleBox = {
        margin: 2
    }
    return (
        <div >
            <Grid container mt={5}>
                <Grid item md={12} sm={12}>
                    <img className="banner-img" src={require('../../assets/images/data/banner_home_pro_4.jpg')} alt="intro" />
                </Grid>
            </Grid>

            <Grid container mt={5} >
                {data ?
                    <Grid item md={12} sm={12}>
                        <Grid container>
                            {data.map((value, index) => {
                                return (
                                    <Grid item md={4} xs={6} key={index} >
                                        <Card key={index}>
                                            <Box sx={styleBox}>
                                                <Grid container margin={'auto'}>
                                                    <Grid item md={6} sm={6}>
                                                        <CardMedia component="img" image={value.imageUrl} style={{ maxWidth: '192px' }} />
                                                    </Grid>
                                                    <Grid item md={6} sm={6}>
                                                        <Grid container sx={{ marginLeft: '10px' }}>
                                                            <Grid item md={12} sm={12}>
                                                                <span className="introComic" onClick={() => onClickDetail(value)} ><p>{value.name}</p></span>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container sx={{ marginLeft: '10px' }}>
                                                            <Grid item md={12} sm={12}>
                                                                <p className="descripComic">{value.type}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container sx={{ marginLeft: '10px' }}>
                                                            <Grid item md={12} sm={12}>
                                                                <p className="descripComic">{value.description}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container sx={{ marginLeft: '10px' }}>
                                                            <Grid item md={12} sm={12}>
                                                                <p className="priceComic">Giá: <span className="priceComic">{value.promotionPrice.toLocaleString()}</span>&nbsp;
                                                                    <span className="priceStockComic">{value.buyPrice.toLocaleString()}</span> VNĐ
                                                                </p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container sx={{ marginLeft: '10px' }}>
                                                            <Grid item md={6} sm={12}>
                                                                <Button variant="contained" size="small" onClick={() => onBuyNowClick(value)}>Mua ngay</Button>
                                                            </Grid>
                                                            <Grid item md={6} sm={12}>
                                                                <Button variant="outlined" size="small" onClick={() => onAddCartClick(value)}>+Giỏ hàng</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card>
                                    </Grid>
                                )
                            })}
                            <Grid container mt={5} mb={5}>
                                <Grid item md={12} sm={12} className='text-center'>
                                    <Button variant="contained" size="large" onClick={() => onClickSeemore()}>Xem thêm</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    : <Grid item md={12} sm={12}>
                        <Grid container style={{ margin: 'auto' }}>
                            <img className="banner-img" src={require('../../assets/images/doraemon.gif')} alt="intro" />
                            <p>Đang tải dữ liệu xin vui lòng chờ</p>
                        </Grid>
                    </Grid>
                }

            </Grid>
        </div>
    )
}

export default IntroHome