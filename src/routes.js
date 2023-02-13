import HomePage from "./pages/Homepage.js";
import ProducPage from "./pages/ProducPage.js";
import CartPage from "./pages/CartPage.js";
import DetailProduct from "./pages/DetailProduct.js";
import UserInfo from "./pages/UserInfo.js";




const routerList = [
    {path: "/", element : <HomePage/>},
    {path: "/products", element : <ProducPage/>},
    {path: "/products/:param", element : <DetailProduct/>},
    {path: "/cart", element : <CartPage/>},
    {path: "/user", element : <UserInfo/>},  
]
export default routerList;