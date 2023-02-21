import { Container, Box, Grid, Button, TextField, Select, MenuItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbBar from "../components/Breadcrumb/BreadcrumbBar"
import { changeBreadCromd, filterClick } from '../actions/users.action';
import { useEffect, useState } from "react";
import AllProducts from "../components/body/AllProducts";
import FilterProducts from "../components/body/FilterProducts";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const ProducPage = () => {
    const dispatch = useDispatch();
    const { isFiter } = useSelector((reduxUser) => reduxUser.userReducer);
    const [searchKey, setSearchKey] = useState({
        minPrice: 0,
        maxPrice: 1000000,
        name: '',
        type: ''
    })
    const onChangeValue = (evt) => {
        const value = evt.target.value;
        setSearchKey({
            ...searchKey,
            [evt.target.name]: value
        });
    }
    const onBtnFilterClick = () => {
        dispatch(filterClick(searchKey, 6, 1))
    }

    //khi F5 hoac load
    useEffect(() => {
        let vBread = [{ name: 'Home', url: '/' },
        { name: 'Product', url: '/products' }]
        dispatch(changeBreadCromd(vBread))
    }, [])
    return (
        <div className="homePage">
            <Header />
            <Container maxWidth='xxl'>
                <Box className="banner-img2">
                    <BreadcrumbBar />
                </Box>
                <Grid container>
                    <Grid item md={12} sm={12}>
                        <Grid container>
                            <Grid item md={2} sm={12} xs={12} >
                                <Box sx={{ backgroundColor: 'white' }}>
                                    <Grid container sx={{ backgroundColor: 'white', color: 'white' }}>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Box sx={{ backgroundColor: 'Highlight', color: 'white' }}>
                                                <h5>&nbsp;Tên Truyện</h5>
                                            </Box>
                                            <TextField size="small" name="name"
                                                onChange={onChangeValue}
                                                label="Nhập tên truyện" fullWidth />
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Box sx={{ backgroundColor: 'Highlight', color: 'white' }}>
                                                <h5>&nbsp;Thể loại</h5>
                                            </Box>
                                            <Select fullWidth onChange={onChangeValue} name="type"
                                                defaultValue={'none'}
                                            >
                                                <MenuItem value={'none'}>-Thể loại-</MenuItem>
                                                <MenuItem value={'Romantic'}>Romantic</MenuItem>
                                                <MenuItem value={'Action'}>Action</MenuItem>
                                                <MenuItem value={'Funny'}>Funny</MenuItem>
                                                <MenuItem value={'Adventure'}>Adventure</MenuItem>
                                                <MenuItem value={'Mystery'}>Mystery</MenuItem>
                                            </Select>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12}>
                                            <Box sx={{ backgroundColor: 'Highlight', color: 'white' }}>
                                                <h5>&nbsp;Giá cả</h5>
                                            </Box>
                                        </Grid>
                                        <Grid item md={12} sm={6} xs={6}>
                                            <TextField size="small"
                                                name="minPrice" onChange={onChangeValue}
                                                label="Giá thấp nhất"
                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }}
                                                fullWidth />
                                        </Grid>
                                        <Grid item md={12} sm={6} xs={6}>
                                            <TextField size="small"
                                                name="maxPrice"
                                                onChange={onChangeValue}
                                                label="Giá cao nhất"
                                                onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }}
                                                fullWidth />
                                        </Grid>
                                        <Grid container mt={1} mb={1} sx={{ justifyContent: 'center' }}>
                                            <Button variant="contained" onClick={onBtnFilterClick}> Tìm Kiếm</Button>
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={10} sm={12} xs={12}>
                                {isFiter ?
                                    <FilterProducts />
                                    :
                                    <AllProducts />
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>

    )
}

export default ProducPage