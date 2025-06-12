import Routes from './Routes/Routes';
import  './App.css'
import { useRoutes } from 'react-router-dom';

export default function App() {
    const routes = useRoutes(Routes)
    return (
        <> {routes}</>
    )
}

