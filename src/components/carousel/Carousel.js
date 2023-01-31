import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import IMAGE from '../../assets/images/banner/index'

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

    }

    return (
        <Grid container >
            <Grid item xs={12} md={12}>
                <Slider {...settings} className="">
                    <Box >
                        <img className="banner-img" src={IMAGE.image2} alt='1' />
                    </Box>
                    <Box >
                        <img className="banner-img" src={IMAGE.image3} alt='12' />
                    </Box>
                    <Box >
                        <img className="banner-img" src={IMAGE.image4} alt='12' />
                    </Box>
                    <Box >
                        <img className="banner-img" src={IMAGE.image5} alt='13' />
                    </Box>
                </Slider>
            </Grid>
        </Grid>
    );
}
export default Carousel