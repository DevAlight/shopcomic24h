import { useSelector } from "react-redux";
import {
    Box, Grid, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Button,
    TextField, MenuItem, ButtonGroup
} from "@mui/material"
import { useState } from "react";

const OrderList = () => {
    const [dataOrder, setDataOrder] = useState(null)
    const total = dataOrder?.orderDetails?.reduce((sum, value) => sum + (value.promotionPrice * value.quantity), 0) || 0;
    const { userVerify } = useSelector((reduxUser) => reduxUser.userReducer);
    // const saveUser = JSON.parse(localStorage.getItem("user", "[]")) || [];
    const styleBox = {
        borderRadius: '15px',
        padding: "2%",
        margin: "1%",
        backgroundColor: 'white'
    }
    const onDetailClick = async (event) => {
        try {
            const request = await fetch(`${process.env.REACT_APP_BASE_URL_BE}/orders/${event}`);
            const status = await request.status;
            const data = await request.json();
            console.log(data);
            //set the book list on state
            if (status === 200) {
                setDataOrder(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box sx={styleBox} >
            <h3>Danh sách order</h3>
            <Grid container >
                <Grid item md={3} sm={3} xs={3}>
                    <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mã order</TableCell>                                    
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {userVerify.orders.length > 0 ? (
                                    userVerify.orders.map((value, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell>
                                                {value.orderCode !== undefined && value.orderCode !== null ? value.orderCode : "N/A"}
                                                <Button onClick={value.orderCode !== undefined && value.orderCode !== null ? () => onDetailClick(value.order) : null}>
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </Button>
                                            </TableCell>                                            
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell align="center">
                                            Bạn không có đơn hàng nào phát sinh
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item md={9} sm={9} xs={9}>
                    <Box sx={styleBox} >
                        {dataOrder ?
                            <Grid container spacing={1}>
                                <Grid item md={6} sm={12} xs={12}>
                                    <TextField name="name" label="Mã Order" variant="outlined" defaultValue={dataOrder.orderCode}
                                        fullWidth disabled />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <TextField name="email" label="Email" variant="outlined" defaultValue={dataOrder.email}
                                        fullWidth disabled />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <TextField name="orderDate" label="Ngày order" variant="outlined" defaultValue={(new Date(dataOrder.orderDate)).toLocaleDateString()}
                                        fullWidth disabled />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <TextField name="shippedDate" label="Ngày giao hàng" variant="outlined" type='date' defaultValue={new Date().toISOString().substring(0, 10)}

                                        InputLabelProps={{ style: { shrink: true, } }}
                                        fullWidth disabled />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
                                    <TextField name="status" label="Trạng thái" variant="outlined" defaultValue={dataOrder.status} select

                                        fullWidth disabled>
                                        <MenuItem value='open'>Open</MenuItem>
                                        <MenuItem value='confirm'>Confirm</MenuItem>
                                        <MenuItem value='cancel'>Cancel</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} sm={6}>
                                    <TextField name="cost" label="Giá tiền" variant="outlined" defaultValue={dataOrder.cost.toLocaleString()}
                                        fullWidth disabled />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <TextField name="note" label="Mô tả" variant="filled" defaultValue={dataOrder.note} multiline

                                        fullWidth rows={3} />
                                </Grid>
                                {dataOrder.orderDetails ?
                                    <>
                                        {dataOrder.orderDetails.map((value, index) => {
                                            return (
                                                <Grid item md={12} sm={12} key={index}>
                                                    <Box sx={styleBox} >
                                                        <Grid container sx={{ alignItems: 'center' }}>
                                                            <Grid item md={2} sm={2}>
                                                                <img src={value.imageUrl} style={{ maxHeight: '80px' }} alt='products' />
                                                            </Grid>
                                                            <Grid item md={3} sm={10}>
                                                                <h4>{value.name}</h4>
                                                            </Grid>
                                                            <Grid item md={2} sm={3}>
                                                                <h4> Qty:</h4>
                                                            </Grid>
                                                            <Grid item md={2} sm={3}>
                                                                <ButtonGroup size="small">
                                                                    {/* <Button
                                                                    onClick={() => onBtnMinusClick(value)}
                                                                    >-</Button> */}
                                                                    <Button disabled>{value.quantity}</Button>
                                                                    {/* <Button
                                                                    onClick={() => onBtnPlusClick(value)}
                                                                    >+</Button> */}
                                                                </ButtonGroup>
                                                            </Grid>
                                                            <Grid item md={3} sm={3}>
                                                                <h5> {(value.promotionPrice * value.quantity).toLocaleString()} VnĐ</h5>
                                                            </Grid>
                                                            {/* <Grid item md={1} sm={3}>
                                                                <Button
                                                                    sx={{ padd: '20px' }}
                                                                    variant="contained"
                                                                    onClick={() => onBtnDelClick(value)}
                                                                    color="error"
                                                                >X</Button>
                                                            </Grid> */}
                                                        </Grid>
                                                    </Box>
                                                </Grid>

                                            )
                                        })}
                                    </>
                                    :
                                    null
                                }
                                <Grid item md={12} sm={12} style={{ textAlign: 'right' }}>
                                    <h3>Tổng :  {total.toLocaleString()} VnĐ</h3>
                                </Grid>
                                <Grid item md={6} sm={6}>
                                    <Button variant="contained" color="error" fullWidth onClick={() => { setDataOrder(null) }}>Quay về</Button>
                                </Grid>
                            </Grid> : null}
                    </Box>



                </Grid>
            </Grid>

        </Box>
    )
}
export default OrderList