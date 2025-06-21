import UserAuth from '../Pages/Shop/UserAuth/UserAuth'
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
import PanelComments from '../Pages/Panel/PanelComments/PanelComments'
import PanelUsers from '../Pages/Panel/PanelUsers/PanelUsers';
import PanelOffers from '../Pages/Panel/PanelOffers/PanelOffers';
import PanelSubComments from '../Pages/Panel/PanelSubComments/PanelSubComments';
import PanelCampains from '../Pages/Panel/PanelCampains/PanelCampains';
import PanelNotice from '../Pages/Panel/PanelNotice/PanelNotice';


let Routes = [
    { path: "/", element: <UserAuth><Main></Main> </UserAuth> },
    { path: "/AllProducts", element: <UserAuth><AllProducts></AllProducts> </UserAuth> },
    { path: "/ProductsDetails/:productID", element: <UserAuth> <ProductsDetails></ProductsDetails> </UserAuth> },
    { path: "/MyCart", element: <UserAuth> <UserCart></UserCart> </UserAuth> },
    { path: "/Login", element: <UserAuth> <Login></Login> </UserAuth> },
    { path: "/Signup", element: <UserAuth><Signup></Signup> </UserAuth> },
    { path: "/ForgotPass", element: <UserAuth><ForgotPass></ForgotPass> </UserAuth> },

    { path: "/PanelProducts", element: <Private><PanelProducts></PanelProducts></Private> },
    { path: "/PanelComments", element: <Private><PanelComments></PanelComments></Private> },
    { path: "/PanelUsers", element: <Private><PanelUsers></PanelUsers></Private> },
    { path: "/PanelOffers", element: <Private><PanelOffers></PanelOffers></Private> },
    { path: "/PanelSubComments", element: <Private><PanelSubComments></PanelSubComments></Private> },
    { path: "/PanelCampains", element: <Private><PanelCampains></PanelCampains></Private> },
    { path: "/PanelNotice", element: <Private><PanelNotice></PanelNotice></Private> },
    { path: "*", element: <Page404></Page404> },
];
export default Routes