import HomePage from "./pages/Homepage.js";
import ProducPage from "./pages/ProducPage.js";
import CartPage from "./pages/CartPage.js";
import DetailProduct from "./pages/DetailProduct.js";
import UserInfo from "./pages/UserInfo.js";
//manager
import LoginPage from './pages/service/LoginPage.js'
import HomeManagerPage from "./pages/service/HomeManagerPage.js";



const routerList = [
    {path: "/", element : <HomePage/>},
    {path: "/products", element : <ProducPage/>},
    {path: "/products/:param", element : <DetailProduct/>},
    {path: "/cart", element : <CartPage/>},
    {path: "/user", element : <UserInfo/>},
    //phục vụ manager
    {path: "/manager", element : <LoginPage/>},
    {path: "/manager/login", element : <HomeManagerPage/>}

]
export default routerList;