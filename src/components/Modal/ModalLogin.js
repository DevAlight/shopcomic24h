import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import auth from '../../firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from 'firebase/auth';
import { Grid, Modal, Button, TextField } from "@mui/material"
import { Box } from "@mui/system";
import { setModalLogin, saveUserLogin } from '../../actions/users.action'



const ModalLogin = () => {
    // Khai báo các data
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
   
    const { openModal } = useSelector((reduxUser) => reduxUser.userReducer);
    const handleClose = () => dispatch(setModalLogin(false));
    // Sự kiện click
    const onBtnLoginSelect = (type) => {
        // Chưa chọn phương thức login
        let provider = null;
        if (type === 'google') {
            provider = new GoogleAuthProvider();
        }
        if (type === 'facebook') {
            provider = new FacebookAuthProvider();
        }
        // Sau khi chọn phương thức, tiến hành login
        signInWithPopup(auth, provider)
            .then((result) => {               
                dispatch(setModalLogin(false));
                dispatch(saveUserLogin(result.user));
                localStorage.setItem('user', JSON.stringify(result.user));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    //sms
  
    // Chỉnh style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 300,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '25px'
    };
    return (
        <Modal open={openModal}
            onClose={handleClose}>
            <Box sx={style}>
                <Grid container>
                    <Grid item md={12} sm={12}>
                        <h3> Đăng nhập</h3>
                    </Grid>
                </Grid>
                <Grid container mt={2}>
                    <Grid item md={12} sm={12}>
                        <Grid container sx={{ justifyContent: 'space-around' }}>
                            <Button variant="contained" color="error" onClick={() => onBtnLoginSelect('google')}>
                                Đăng nhập bằng &nbsp;<i className="fa-brands fa-google"></i></Button>
                            <Button variant="contained" onClick={() => onBtnLoginSelect('facebook')}>
                                Đăng nhập bằng&nbsp; <i className="fa-brands fa-square-facebook"></i>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container mt={2}>
                        <Grid item md={12} sm={12}>
                            <div className="division">
                                <div className="line l"></div>
                                <span><p>Or</p></span>
                                <div className="line r"></div>
                            </div>
                        </Grid>
                    </Grid>
                    {isCodeSent ?
                        <Grid container mt={2} sx={{ alignItems: 'center' }}>
                            <Grid item md={8} sm={8}>
                                <Grid container sx={{ justifyContent: 'space-around' }}>
                                    <TextField label="Nhập số đăng nhập" variant="outlined" size="small" fullWidth />
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={4}>
                                <Grid container sx={{ justifyContent: 'space-around' }}>
                                    <Button variant="contained" size="large" onClick={() => onBtnLoginSelect('sms')}>Đăng nhập</Button>
                                </Grid>
                            </Grid>
                        </Grid> :
                        <Grid container mt={2} sx={{ alignItems: 'center' }}>
                            <Grid item md={8} sm={8}>
                                <Grid container sx={{ justifyContent: 'space-around' }}>
                                    <TextField onChange={e => setVerificationCode(e.target.value)} id="outlined-basic" label="Đăng nhập bằng SĐT" variant="outlined" size="small" fullWidth />
                                </Grid>
                            </Grid>
                            <Grid item md={4} sm={4}>
                                <Grid container sx={{ justifyContent: 'space-around' }}>
                                    <Button variant="contained" size="small" >Lấy mã xác thực</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    }


                </Grid>
            </Box>
        </Modal >
    )


}

export default ModalLogin