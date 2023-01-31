import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Grid, Modal } from "@mui/material"
import { Box } from "@mui/system";
import { modelOrder } from '../../actions/users.action'



const ModalOrder = () => {
    // Khai báo các data
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const { orderID } = useSelector((reduxUser) => reduxUser.userReducer);
    const handleClose = () => dispatch(modelOrder(null));
    useEffect(() => {
        if (orderID) {
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    }
        , [orderID])

    // Chỉnh style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 150,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '25px'
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Grid container>
                    <Grid item md={12} sm={12}>
                        <h4> Mã order của bạn là</h4>
                    </Grid>
                </Grid>
                <Grid container mt={1}>
                    <Grid item md={12} sm={12}>
                        <div className="division">
                            <div className="line l"></div>
                            <span><h6>{orderID}</h6></span>
                            <div className="line r"></div>
                        </div>
                    </Grid>

                </Grid>
                <Grid container mt={1} sx={{ justifyContent: 'space-around' }}>
                    <h6>Xem thêm tại trang thông tin</h6>
                </Grid>
            </Box>
        </Modal >
    )


}

export default ModalOrder