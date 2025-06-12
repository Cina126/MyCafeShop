import Main from './../Pages/Main/Main'
import ProductsDetails from './../Pages/ProductsDetails/ProductsDetails'
import UserCart from './../Pages/UserCart/UserCart'
import Login from './../Pages/Login/Login';
import Signup from './../Pages/Signup/Signup';
import ForgotPass from './../Pages/ForgotPass/ForgotPass';
// import Page404 from './../Pages/Page404/Page404'
import AllProducts from './../Pages/AllProducts/AllProducts';

let Routes = [
    { path: "/", element: <Main></Main> },
    { path: "/AllProducts", element: <AllProducts></AllProducts> },
    { path: "/ProductsDetails/:productID", element: <ProductsDetails></ProductsDetails> },
    { path: "/MyCart", element: <UserCart></UserCart> },
    { path: "/Login", element: <Login></Login> },
    { path: "/Signup", element: <Signup></Signup> },
    { path: "/ForgotPass", element: <ForgotPass></ForgotPass> },
    // { path: "*", element: <Page404></Page404> },
];
export default Routes