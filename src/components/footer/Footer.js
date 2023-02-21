import { Grid } from "@mui/material"


const Footer = () => {
    return (
        <div style={{ backgroundColor: "White" }}>
            <Grid container>
                <Grid item md={8} sm={12} xs={12}>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <Grid container className="mt-4">                                
                                <Grid item xs={4} sm={3}>
                                    <h5>PRODUCTS</h5>
                                    <p>Help Center</p>
                                    <p>Contract Us</p>
                                    <p>Product Help</p>
                                    <p>Warranty</p>

                                </Grid>
                                <Grid item xs={4} sm={3}>
                                    <h5>PRODUCTS</h5>
                                    <p>Help Center</p>
                                    <p>Contract Us</p>
                                    <p>Product Help</p>
                                    <p>Warranty</p>

                                </Grid>
                                <Grid item xs={4} sm={3}>
                                    <h5>PRODUCTS</h5>
                                    <p>Help Center</p>
                                    <p>Contract Us</p>
                                    <p>Product Help</p>
                                    <p>Warranty</p>

                                </Grid>
                                <Grid item xs={1.5} sm={1.5}>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={4} sm={12} className='navbar_menu'>
                    <Grid container className="mt-4">
                        <Grid item xs={12} sm={12}>
                            <Grid container className="mt-4">
                                <Grid item xs={12} sm={12}>
                                    <h4>DevCamp</h4>
                                </Grid>
                            </Grid>
                            <Grid container className="mt-4">
                                <Grid item xs={12} sm={12}>
                                    &nbsp;&nbsp;<i className="fa-brands fa-facebook">&nbsp;</i>
                                    <i className="fa-brands fa-instagram">&nbsp;</i>
                                    <i className="fa-brands fa-youtube">&nbsp;</i>
                                    <i className="fa-brands fa-twitter">&nbsp;</i>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>

    )
}
export default Footer