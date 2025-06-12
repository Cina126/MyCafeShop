/* eslint-disable no-unused-vars */

import  './Menues.css'
import { Link } from 'react-router-dom'

export default function Menues({ title, to }) {
    return (
        <Link className='Link' to={to}>{title}</Link>
    )
}
