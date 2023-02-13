import { Container, Box, Grid, ButtonGroup, Button, Card, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BreadcrumbBar from "../components/Breadcrumb/BreadcrumbBar";
import { changeBreadCromd, addProductToCartHandler, setModalLogin } from '../actions/users.action';
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


function DetailProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { param } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState();
    const { user } = useSelector((reduxUser) => reduxUser.userReducer);
    const saveData = JSON.parse(localStorage.getItem("item", "[]")) || [];
    //Them hoac bot cart
    const onBtnPlusClick = () => {
        setQuantity(quantity + 1)
    }
    const onBtnMinusClick = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    }
    //mua hoac add vao gio
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
            navigate('/cart')
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
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL_BE}/products/${param}`);
                const data = await response.json();
                setProduct(data.data);
                let vBread = [{ name: 'Home', url: '/' }, { name: 'Product', url: '/products' }
                    , { name: data.data.name, url: `/products/${data.data._id}` }]
                dispatch(changeBreadCromd(vBread));
            } catch (error) {
                console.log(error);
            }
        }
        fetchProduct();

    }, [param]);
    //Tìm kiếm loại truyện liên quan
    useEffect(() => {
        if (product) {
            fetch(`${process.env.REACT_APP_BASE_URL_BE}/products-limit?limit=6&type=${product.type}`)
                .then(res => res.json())
                .then(data => setRelatedProducts(data.data));            
        }
    }, [product]);
    const styleBox = { backgroundColor: 'white', margin: '1%', padding: '1%', borderRadius: '10px' }
    return (
        <div className="homePage">
            <Header />
            <Container maxWidth='xxl'>
                <Box className="banner-img2">
                    <BreadcrumbBar />
                </Box>
                <Grid container mt={2} sx={{ backgroundColor: '#F5F5F5' }}>
                    {product ?
                        <Grid item md={12} sm={12}>
                            <Box sx={styleBox}>
                                <Grid container>
                                    <Grid item md={4} sm={4}>
                                        <img className="banner-img" src={product.imageUrl} />
                                    </Grid>
                                    <Grid item md={8} sm={8}>
                                        <Grid container>
                                            <Box sx={styleBox}>
                                                <Grid item md={12} sm={12}>
                                                    <Grid container >
                                                        <Grid item md={12} sm={12}>
                                                            <h2> {product.name}</h2>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container sx={{ marginLeft: '10px' }}>
                                                        <Grid item md={12} sm={12}>
                                                            <p className="descripComic">{product.type}</p>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container sx={{ marginLeft: '10px' }}>
                                                        <Grid item md={12} sm={12}>
                                                            <p>{product.description}</p>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container >
                                                        <Grid item md={12} sm={12}>
                                                            <p className="priceComic">Giá: <span className="priceComic">{product.promotionPrice.toLocaleString()}</span>&nbsp;
                                                                <span className="priceStockComic">{product.buyPrice.toLocaleString()}</span> VNĐ
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container >
                                                        <Grid item md={12} sm={12}>
                                                            <ButtonGroup size="small">
                                                                <Button
                                                                    onClick={onBtnMinusClick}
                                                                >-</Button>
                                                                <Button disabled>{quantity}</Button>
                                                                <Button
                                                                    onClick={onBtnPlusClick}
                                                                >+</Button>
                                                            </ButtonGroup>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container mt={3}>
                                                        <Grid item md={12} sm={12}>
                                                            <ButtonGroup size="large">
                                                                <Button variant="contained" size="large" onClick={() => onBuyNowClick(product)}>Mua ngay</Button>
                                                                <Button variant="outlined" size="large" onClick={() => onAddCartClick(product)}>+Giỏ hàng</Button>
                                                            </ButtonGroup>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container mt={1} sx={{ justifyContent: 'space-around' }}>
                                    <div className="underline-text">
                                        <h3>Cùng thế loại</h3>
                                    </div>
                                    <Grid container mt={2}>
                                        {relatedProducts
                                            ?
                                            <>
                                                {relatedProducts.map((value, index) => {
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
                                            </>
                                            :
                                            <h2>Không tìm thấy truyện liên quan</h2>
                                        }
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        :
                        <h1>Loading</h1>
                    }

                </Grid>
            </Container>
            <Footer />
        </div>

    )
}
export default DetailProduct