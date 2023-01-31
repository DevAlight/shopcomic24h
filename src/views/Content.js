import routes from '../routes'
import { Route, Routes } from "react-router-dom";
import HomePage from '../pages/Homepage';

const Content = ()=>{
    return (
        <>
            <Routes>
                {routes.map((router, index) => {
                    return (
                        <Route key={index} exact path={router.path} element={router.element}></Route>
                    )
                })}
                <Route path="*" element={<HomePage />}></Route>
            </Routes>
        </>
    )
}
export default Content