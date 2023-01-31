import { useSelector, useDispatch } from "react-redux";
import { filterClick, changePaginationFilter, setModalLogin, addProductToCartHandler } from '../../actions/users.action';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardMedia, Pagination, Box, Button, Stack } from "@mui/material";

const FilterProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, dataFiterFull, dataFiter, currentPageFiter, quantity, pending, searchData } = useSelector((reduxUser) => reduxUser.userReducer);
    const saveData = JSON.parse(localStorage.getItem("item", "[]")) || [];
    const limit = 6;
    const noPage = Math.ceil(dataFiterFull / limit);
    const handleChange = (event, value) => {
        dispatch(changePaginationFilter(value));
    };
    //khai bao mua ban
    const onBuyNowClick = (value) => {
        if (user) {
            console.log(`test`);
        }
        else {
            dispatch(setModalLogin(true))
        }
    }
    const onAddCartClick = (event) => {
        if (user) {
            if (saveData[0] == undefined) {
                const ProductAdd = [{ Product: event, quantity: quantity }]
                localStorage.setItem("item", JSON.stringify(ProductAdd));
                //lưu dữ liệu sản phẩm đã chọn vào local storage
                dispatch(addProductToCartHandler(ProductAdd));
            }
            else {
                let i = saveData.findIndex((el) => el.Product._id === event._id)
                if (i != -1) {
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

    //khai bao style the
    const styleBox = {
        margin: 2,
        maxHeight: "300px"
    }
    useEffect(() => {
        dispatch(filterClick(searchData, limit, currentPageFiter));

    }, [currentPageFiter])
    return (
        <Grid container>
            {pending ?
                <Grid container sx={{ justifyContent: 'flex-end' }}>
                    <Grid container style={{ margin: 'auto' }}>
                        <Box sx={{ backgroundColor: 'white' }}>
                            <img className="banner-img" src={require('../../assets/images/doraemon.gif')} alt="intro" />
                            <p>Đang tải dữ liệu xin vui lòng chờ</p>
                        </Box>
                    </Grid>
                </Grid>
                :
                <Grid item md={12} sm={12}>
                    <Box sx={{ backgroundColor: 'white', paddingBottom: '2px' }}>
                        <Grid container>
                            {dataFiter.map((value, index) => {
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
                                                                <span className="introComic" onClick={() => onClickDetail(value)}><p>{value.name}</p></span>
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
                                                            <Button variant="contained" size="small" onClick={() => onBuyNowClick(value)}>Mua ngay</Button>
                                                            <Button variant="outlined" size="small" onClick={() => onAddCartClick(value)}>+Giỏ hàng</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid container mt={2} pb={2}>
                            <Stack >
                                <Pagination count={noPage} shape="rounded" defaultPage={currentPageFiter} onChange={handleChange} />
                            </Stack>
                        </Grid>
                    </Box>
                </Grid>
            }

        </Grid>
    )
}

export default FilterProducts