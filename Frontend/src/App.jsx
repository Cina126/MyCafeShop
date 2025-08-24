/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import './App.css';

import Routes from './Routes/Routes';
import { useRoutes } from 'react-router-dom';
import Context from './Context/Context';
import {Toaster} from 'react-hot-toast'

export default function App() {

    const routes = useRoutes(Routes);

    return (
        <Context>
            <Toaster></Toaster>
            {routes}
        </Context>
    )
}

