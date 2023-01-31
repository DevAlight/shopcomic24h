import { Container, Box, Grid, ButtonGroup, Button, TextField, Select, MenuItem, List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import BreadcrumbBar from "../components/Breadcrumb/BreadcrumbBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeBreadCromd, addProductToCartHandler,gettingOrder } from '../actions/users.action';
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartBag } = useSelector((reduxUser) => reduxUser.userReducer);
    const [allOk, setAllok] = useState(true);
    const [city, setCity] = useState([]);
    //Khai báo thanh toán
    const [bank, setBank] = useState(false);
    const [shipCOD, setShipCOD] = useState(true);
    //thay đôi phương thức payment
    const selectPayment = (value) => {
        if (value === 'bank') {
            setBank(true);
            setShipCOD(false)
        }
        else {
            setBank(false);
            setShipCOD(true)
        }
    }
    //ghi chép info   
    const [Info, setUser] = useState({
        ward: '',
        city: '',
        district: '',
    })
    //thu nhập
    const onChangeValue = (evt) => {
        const value = evt.target.value;
        setUser({
            ...Info,
            [evt.target.name]: value
        });
        console.log(Info);
    }
    const onChangeSelectValue = (evt, value) => {
        const name = value.props.children;
        setUser({
            ...Info,
            [evt.target.name]: name
        });       
    }
    //onSelect
    const [cityId, setCityId] = useState('none');
    //selet Quận
    const [districtId, setDistrictId] = useState('none');
    const [selectDistrict, setSelectDistrict] = useState(false);
    const [district, setDistrict] = useState('none');
    //selet xã, phường
    const [ward, setWard] = useState('none');
    const [selectWard, setSelectWard] = useState(false);
    const [wardId, setWardId] = useState('none');

    //gọi lưu trữ strore
    const saveData = JSON.parse(localStorage.getItem("item", "[]")) || [];
    const saveUser = JSON.parse(localStorage.getItem("user", "[]")) || [];
    const userVerify = JSON.parse(localStorage.getItem("userVerify", "[]")) || [];
    const total = cartBag.reduce((sumary, item) => sumary + item.Product.promotionPrice * item.quantity, 0);
    //cộng thêm 1 vào giỏ
    const onBtnPlusClick = (event) => {
        let i = saveData.findIndex((el) => el.Product._id === event.Product._id)
        if (i !== -1) {
            saveData[i].quantity++;
            // đẩy dữ liệu các sản phẩm lên local storage
            localStorage.setItem("item", JSON.stringify(saveData));
            dispatch(addProductToCartHandler(saveData));
        }
    }
    //trừ 1
    const onBtnMinusClick = (event) => {
        let i = saveData.findIndex((el) => el.Product._id === event.Product._id)
        if (i !== -1) {
            if (saveData[i].quantity > 1) {
                saveData[i].quantity--;
                // đẩy dữ liệu các sản phẩm lên local storage
                localStorage.setItem("item", JSON.stringify(saveData));
                dispatch(addProductToCartHandler(saveData));
            };

        }
    }
    //xoá 
    const onBtnDelClick = (event) => {
        let i = saveData.findIndex((el) => el.Product._id === event.Product._id)
        if (i !== -1) {
            saveData.splice(i, 1);
            // đẩy dữ liệu các sản phẩm lên local storage
            localStorage.setItem("item", JSON.stringify(saveData));
            dispatch(addProductToCartHandler(saveData));
        }
    }
    //chọn city
    const handleCityChange = (event) => {
        setCityId(event.target.value);
        if (event.target.value === 'none') {
            //huỷ chọn quận
            setDistrict('none');
            setSelectDistrict(false)
            //huỷ luôn xã
            setWard('none')
            setSelectWard(false);
        }
        else {
            let vDistricts = city[event.target.value].Districts;
            setDistrict(vDistricts)
            setSelectDistrict(true)
        }
    }
    //chọn quận
    const handleDistrictChange = (event) => {
        setDistrictId(event.target.value);
        if (event.target.value === 'none') {
            setWard('none')
            setSelectWard(false);
        }
        else {
            let vWards = district[event.target.value].Wards
            setWard(vWards)
            setSelectWard(true);
        }

    }
    //chọn phường,xã
    const handleWardChange = (event) => {
        setWardId(event.target.value);
        if (event.target.value === 'none') {
            setWard('none')
            setSelectWard(false);
        }
        else {
            setSelectWard(true);
        }

    }
    //Tiến hành Order
    const onOrderClick = () => {
        //lọc danh sách orderDatail
        const cartItems = saveData;
        const orderDetails = cartItems.map(({ Product, quantity }) => {
            const product = Product._id;
            return { product, quantity }
        });
        let fixData = {
            fullName: Info.fullName,
            phone: Info.fullName,
            district: Info.district,
            city: Info.city,
            ward: Info.ward
        };
        //lọc lại data thay đổi
        if (Info.fullName === undefined) {
            fixData.fullName = userVerify.fullName;
        }
        if (Info.phone === undefined) {
            fixData.phone = userVerify.phone;
        }
        if (Info.address === undefined) {
            fixData.address = userVerify.address;
        }
        //tạo dât note        
        let finalNote = `Ông/bà: ${fixData.fullName}
        ĐT: ${fixData.phone}
        Địa chỉ: ${fixData.address}, ${fixData.ward} , ${fixData.district}, ${fixData.city}`;    
        let dataOrder = {
            note:finalNote,
            cost:total
        }        
        dispatch(gettingOrder(userVerify._id,dataOrder,orderDetails))        
    }
    //chưa xác thực chim cút
    const onValidClick = () => {
        navigate('/user')
    }
    //gọi data hành là chính
    useEffect(() => {
        let vBread = [{ name: 'Home', url: '/' },
        { name: 'Cart', url: '/cart' }]
        dispatch(changeBreadCromd(vBread))
        fetch('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then(response => response.json())
            .then(data => {
                setCity(data)
            });
    }, []);
    //gọi check data
    useEffect(() => {
        if (Info.city === '') {
            setAllok(true)
        }
        if (Info.district === '') {
            setAllok(true)
        }
        if (Info.ward === '') {
            setAllok(true)
        }
        else {
            setAllok(false)
        }
    }, [Info]);
    const styleBox = {
        borderRadius: '15px',
        padding: "2%",
        margin: "1%",
        backgroundColor: 'white'
    }
    const styleContainer = {
        justifyContent: 'space-evenly',
        padding: '1%'
    }
    return (
        <div className="homePage">
        <Header/>
        <Container maxWidth='xxl'>
            <Box className="banner-img2">
                <BreadcrumbBar />
            </Box>
            <Grid container sx={{ backgroundColor: '#F5F5F5' }}>
                <Grid item md={12} sm={12}>
                    <h2>Giỏ hàng của bạn</h2>
                    <Grid container>
                        {/* show item trên cart */}
                        <Grid item md={8} sm={12}>
                            {saveData[0] === undefined?<h3>Mua gì đi :3</h3>:null}
                            {cartBag.map((value, index) => {
                                return (
                                    <Box sx={styleBox} key={index}>
                                        <Grid container>
                                            <Grid item md={2} sm={2}>
                                                <img className="banner-img" src={value.Product.imageUrl} alt={index}/>
                                            </Grid>
                                            <Grid item md={10} sm={10}>
                                                <Grid container sx={styleContainer}>
                                                    <h4>{value.Product.name}</h4>
                                                </Grid>
                                                <Grid container sx={styleContainer}>
                                                    <p className="descripComic">{value.Product.type}</p>
                                                </Grid>
                                                <Grid container sx={styleContainer}>
                                                    <h6>{value.Product.description}</h6>
                                                </Grid>
                                                <Grid container sx={styleContainer}>
                                                    <Grid item md={2} sm={2}>
                                                        <h3> Qty:</h3>
                                                    </Grid>
                                                    <Grid item md={5} sm={5}>
                                                        <ButtonGroup size="small">
                                                            <Button
                                                                onClick={() => onBtnMinusClick(value)}
                                                            >-</Button>
                                                            <Button disabled>{value.quantity}</Button>
                                                            <Button
                                                                onClick={() => onBtnPlusClick(value)}
                                                            >+</Button>
                                                        </ButtonGroup>
                                                    </Grid>
                                                    <Grid item md={5} sm={5}>
                                                        <Grid container sx={styleContainer}>
                                                            <Grid item md={6} sm={6}> <h4> {(value.Product.promotionPrice * value.quantity).toLocaleString()} VnĐ</h4></Grid>
                                                            <Grid item md={6} sm={6}> <Button
                                                                sx={{ padd: '20px' }}
                                                                variant="contained"
                                                                onClick={() => onBtnDelClick(value)}
                                                                color="error"
                                                            >X</Button></Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                )
                            })}
                        </Grid>
                        {/* Info và thanh toán */}
                        <Grid item md={4} sm={12}>
                            {/* info */}
                            <Grid container mt={1}>
                                <Grid item md={12} sm={12}>
                                    <Box sx={styleBox}>
                                        <Grid container sx={styleContainer}>
                                            <h4>Địa chỉ gửi hàng</h4>
                                        </Grid>
                                        {/* email */}
                                        <Grid container sx={styleContainer}>
                                            <TextField label="Email" variant="filled" defaultValue={saveUser.email} fullWidth disabled />
                                        </Grid>
                                        <Grid container sx={styleContainer}>
                                            <TextField label="Họ và tên" name="fullName" variant="filled" defaultValue={userVerify.fullName} onChange={onChangeValue} fullWidth />
                                        </Grid>
                                        <Grid container sx={styleContainer}>
                                            <TextField label="Số điện thoại" name="phone" defaultValue={userVerify.phone} onChange={onChangeValue} variant="filled" fullWidth onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
                                        </Grid>
                                        {/* selectCiTY */}
                                        <Grid container sx={styleContainer}>
                                            <Grid item md={12} sm={12}>
                                                {city ?
                                                    <Select
                                                        value={cityId}
                                                        name='city'
                                                        fullWidth
                                                        onChange={(e, value) => { handleCityChange(e); onChangeSelectValue(e, value) }}>
                                                        <MenuItem value={'none'}>Tỉnh/Thành phố</MenuItem>
                                                        {city.map((value, index) => {
                                                            return <MenuItem value={index} key={index}>{value.Name}</MenuItem>
                                                        }
                                                        )}
                                                    </Select>
                                                    : <Select>
                                                        <MenuItem value={'none'}>Tỉnh/Thành phố</MenuItem>
                                                    </Select>
                                                }
                                            </Grid>
                                        </Grid>
                                        {/* select District */}
                                        <Grid container sx={styleContainer}>
                                            {selectDistrict ?
                                                <Select
                                                    value={districtId}
                                                    fullWidth
                                                    name='district'
                                                    onChange={(e, value) => { handleDistrictChange(e); onChangeSelectValue(e, value) }}>
                                                    <MenuItem value={'none'}>Quận huyện</MenuItem>
                                                    {district.map((value, index) => {
                                                        return <MenuItem value={index} key={index}>{value.Name}</MenuItem>
                                                    }
                                                    )}
                                                </Select>
                                                :
                                                <Select value={districtId} fullWidth>
                                                    <MenuItem value={'none'} fullWidth>Quận huyện</MenuItem>
                                                </Select>}
                                        </Grid>
                                        {/* select ward */}
                                        <Grid container sx={styleContainer}>
                                            {selectWard ?
                                                <Select
                                                    value={wardId}
                                                    fullWidth
                                                    name='ward'
                                                    onChange={(e, value) => { handleWardChange(e); onChangeSelectValue(e, value) }}>
                                                    <MenuItem value={'none'}>Phường Xã</MenuItem>
                                                    {ward.map((value, index) => {
                                                        return <MenuItem value={index} key={index}>{value.Name}</MenuItem>
                                                    }
                                                    )}
                                                </Select>
                                                :
                                                <Select
                                                    value={wardId}
                                                    fullWidth
                                                >
                                                    <MenuItem value={'none'} >Phường Xã</MenuItem>
                                                </Select>}
                                        </Grid>
                                        <Grid container sx={styleContainer} >
                                            <TextField label="Số nhà" defaultValue={userVerify.address} name='address' onChange={onChangeValue} variant="filled" fullWidth />
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            {/* Payment */}
                            <Grid container mt={1}>
                                <Grid item md={12} sm={12}>
                                    <Box sx={styleBox}>
                                        <Grid container sx={styleContainer}>
                                            <h4>Tổng thanh toán</h4>
                                        </Grid>
                                        <Grid container sx={styleContainer}>
                                            <h4>{total.toLocaleString()} VnĐ</h4>
                                        </Grid>
                                        <Grid container sx={styleContainer}>
                                            <List
                                                sx={{ width: '100%', maxWidth: 450, bgcolor: '#F5F5F5' }}
                                                subheader={<ListSubheader>Tuỳ chọn thanh toán</ListSubheader>}
                                            >
                                                <ListItemButton onClick={() => selectPayment('bank')}>
                                                    <ListItemIcon>
                                                        <i className="fa-regular fa-credit-card"></i>
                                                    </ListItemIcon>
                                                    <ListItemText primary='Thanh toán qua ngân hàng' />
                                                    {bank ? <i className="fa-solid fa-check"></i> : null}

                                                </ListItemButton>
                                                <ListItemButton onClick={() => selectPayment('cod')}>
                                                    <ListItemIcon>
                                                        <i className="fa-solid fa-truck-fast"></i>
                                                    </ListItemIcon>
                                                    <ListItemText primary='Thanh toán COD' />
                                                    {shipCOD ? <i className="fa-solid fa-check"></i> : null}
                                                </ListItemButton>
                                            </List>
                                        </Grid>
                                        <Grid container sx={styleContainer}>
                                            {userVerify._id?
                                                <Button sx={{ padding: '10px', fontSize: '20px' }} onClick={onOrderClick}
                                                    fullWidth
                                                    size="large" variant="contained" color="success"
                                                    disabled={allOk}
                                                >Tiến hành Thanh toán
                                                </Button>
                                                :
                                                <Button sx={{ padding: '10px', fontSize: '20px' }} onClick={onValidClick}
                                                    fullWidth
                                                    size="large" variant="contained" color="error">Vui lòng xác thực thông tin
                                                </Button>}
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <Footer/>
        </div>
        
    )

}

export default CartPage