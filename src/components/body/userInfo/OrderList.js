import {  useSelector } from "react-redux";
import { Box, Grid, TableContainer, Table,TableHead,TableCell,TableRow,TableBody } from "@mui/material"

const OrderList = () => {
    // const dispatch = useDispatch();
    const { userVerify } = useSelector((reduxUser) => reduxUser.userReducer);
    // const saveUser = JSON.parse(localStorage.getItem("user", "[]")) || [];
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
            <h3>Danh sách order</h3>
            <Grid container sx={styleContainer}>
                <Grid item md={12}>
                    <TableContainer >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mã id</TableCell>
                                    {/* <TableCell>Tình trạng</TableCell>                                     */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userVerify.orders.map((value,index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {value.orderCode||value._id}
                                        </TableCell>                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

        </Box>
    )
}
export default OrderList