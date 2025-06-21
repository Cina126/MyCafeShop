import Main from '../Pages/Shop/Main/Main'
import ProductsDetails from '../Pages/Shop/ProductsDetails/ProductsDetails'
import UserCart from '../Pages/Shop/UserCart/UserCart'
import Login from '../Pages/Shop/Login/Login';
import Signup from '../Pages/Shop/Signup/Signup';
import ForgotPass from '../Pages/Shop/ForgotPass/ForgotPass';
import Page404 from '../Pages/Shop/Page404/Page404'
import AllProducts from '../Pages/Shop/AllProducts/AllProducts';
// -----------------------------------------------------------------------------------------------------------------------------------------------------------
import Private from './../Pages/Panel/Private/Private'
import PanelProducts from '../Pages/Panel/PanelProducts/PanelProducts'


let Routes = [
    { path: "/", element: <Main></Main> },
    { path: "/AllProducts", element: <AllProducts></AllProducts> },
    { path: "/ProductsDetails/:productID", element: <ProductsDetails></ProductsDetails> },
    { path: "/MyCart", element: <UserCart></UserCart> },
    { path: "/Login", element: <Login></Login> },
    { path: "/Signup", element: <Signup></Signup> },
    { path: "/ForgotPass", element: <ForgotPass></ForgotPass> },
    { path: "/PanelProducts", element: <PanelProducts></PanelProducts> },
    { path: "*", element: <Page404></Page404> },
];
export default Routes