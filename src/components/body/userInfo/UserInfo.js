import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { saveUserLogin } from '../../../actions/users.action';
import { Box, Grid, Button, TextField } from "@mui/material"

const UserInfoBacsic = () => {
    const dispatch = useDispatch();
    const { userVerify } = useSelector((reduxUser) => reduxUser.userReducer);
    const saveUser = JSON.parse(localStorage.getItem("user", "[]")) || [];


    //khai báo là lưu trữ info
    const [Info, setUser] = useState({
        fullName: '',
        phone: '',
        email: saveUser.email,
        address: '',
        city: '',
        country: ''
    })
    //thu nhập
    const onChangeValue = (evt) => {
        const value = evt.target.value;
        setUser({
            ...Info,
            [evt.target.name]: value
        });
    }
    //click update chưa có use thì tạo, có rồi thì update
    const onUpdateUserClick = async () => {

        if (userVerify) {
            updateUser();
        }
        else {
            createUser();
        }
    }
    //thực thi hàm nếu user mới
    const createUser = async () => {
        console.log(Info);
        try {
            const response = await fetch(process.env.REACT_APP_BASE_URL_BE+'/customers', {
                method: 'POST',
                body: JSON.stringify(Info),
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            //thành công cập nhập lại user để lấy id
            dispatch(saveUserLogin(saveUser));
        } catch (error) {
            console.error(error);
        }
    }
    //có use sẵn nên lấy luôn id để update
    const updateUser = async () => {
        let fixData = {
            fullName: Info.fullName,
            phone: Info.fullName,
            email: saveUser.email,
            address: Info.address,
            city: Info.city,
            country: Info.country
        };
        //lọc lại data thay đổi
        if (Info.fullName === "") {
            fixData.fullName = userVerify.fullName;
        }
        if (Info.phone === "") {
            fixData.phone = userVerify.phone;
        }
        if (Info.country === "") {
            fixData.country = userVerify.country;
        }
        if (Info.city === "") {
            fixData.city = userVerify.city;
        }
        if (Info.address === "") {
            fixData.address = userVerify.address;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL_BE}/customers/${userVerify._id}`, {
                method: 'PUT',
                body: JSON.stringify(fixData),
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            //thành công cập nhập lại user để lấy id
            dispatch(saveUserLogin(saveUser));

        } catch (error) {
            console.error(error);
        }
    }


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
        <Box sx={styleBox} >
            <h3>Thông tin cơ bản</h3>
            <Grid container sx={styleContainer}>
                <TextField label="Email" name="email" onChange={onChangeValue} variant="filled" defaultValue={saveUser.email} fullWidth disabled />
            </Grid>
            <Grid container sx={styleContainer}>
                {userVerify ?
                    <TextField label="Họ và tên" variant="filled" fullWidth name="fullName" defaultValue={userVerify.fullName} onChange={onChangeValue} />
                    :
                    <TextField label="Họ và tên" variant="filled" fullWidth name="fullName" onChange={onChangeValue} />
                }

            </Grid>
            <Grid container sx={styleContainer}>
                <Grid item md={5.8} sm={12}>
                    {/* chỉ có thể nhập số */}
                    {userVerify ?
                        <TextField label="Số điện thoại" defaultValue={userVerify.phone} variant="filled" name="phone" onChange={onChangeValue} fullWidth onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
                        :
                        <TextField label="Số điện thoại" variant="filled" name="phone" onChange={onChangeValue} fullWidth onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
                    }
                </Grid>
                <Grid item md={0.4} >
                </Grid>
                <Grid item md={5.8} sm={12}>
                    {userVerify ?
                        <TextField label="Quốc gia" variant="filled" defaultValue={userVerify.country} name="country" onChange={onChangeValue} fullWidth />
                        :
                        <TextField label="Quốc gia" variant="filled" name="country" onChange={onChangeValue} fullWidth />
                    }
                </Grid>
            </Grid>
            <Grid container sx={styleContainer}>
                <Grid item md={5.8} sm={12}>
                    {userVerify ?
                        <TextField label="Địa chỉ" variant="filled" defaultValue={userVerify.address} name="address" onChange={onChangeValue} fullWidth />
                        :
                        <TextField label="Địa chỉ" variant="filled" name="address" onChange={onChangeValue} fullWidth />
                    }

                </Grid>
                <Grid item md={0.4}>
                </Grid>
                <Grid item md={5.8} sm={12}>
                    {userVerify ?
                        <TextField label="Tỉnh" variant="filled" defaultValue={userVerify.city} name="city" onChange={onChangeValue} fullWidth />
                        :
                        <TextField label="Tỉnh" variant="filled" name="city" onChange={onChangeValue} fullWidth />
                    }

                </Grid>
            </Grid>
            <Grid container sx={styleContainer}>
                <Button variant="contained" onClick={onUpdateUserClick}>Cập nhập</Button>
            </Grid>

        </Box>
    )
}
export default UserInfoBacsic