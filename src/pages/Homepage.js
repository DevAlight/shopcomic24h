import { Container } from "@mui/material";
import Carousel from "../components/carousel/Carousel";
import IntroHome from "../components/body/IntroHome";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const HomePage = () => {
    return (
        <div className="homePage">
            <Header />
            <Container maxWidth='xxl'>
                <Carousel />
                <IntroHome />
            </Container>
            <Footer />

        </div>

    )
}
export default HomePage;