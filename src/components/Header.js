import React from 'react'
import { Link } from 'react-router-dom'

function Header(){
    return(
        <nav className="nav">
            <p><Link id="links" to='/'>Home</Link></p>
            <p><Link id="links" to='/game'>Play</Link></p>
            <p><Link id="links" to='/search'>Search</Link></p>
        </nav>
    )
}

export default Header