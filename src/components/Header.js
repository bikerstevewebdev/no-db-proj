import React from 'react'
import { Link } from 'react-router-dom'
// import {Tabs, Tab} from 'material-ui/Tabs';
// import FontIcon from 'material-ui/FontIcon';
// import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


function Header(props){
    return(
        <nav className="nav">
            <p><Link id="links" to='/'>Home</Link></p>
            <p><Link id="links" to='/game'>Play</Link></p>
            <p><Link id="links" to='/search'>Search</Link></p>
        </nav>
    )
    
    // <MuiThemeProvider style={{width: "100%"}}>
    //     <Tabs style={{"display": "flex", "width": "100%"}}>
    //         <Link id="links" to='/'>
    //             <Tab
    //             icon={<FontIcon className="material-icons">phone</FontIcon>}
    //             label="HOME"
    //             />
    //         </Link>
    //         <Link id="links" to='/game'>
    //             <Tab
    //             icon={<FontIcon className="material-icons">favorite</FontIcon>}
    //             label="PLAY"
    //             />
    //         </Link>
    //         <Link id="links" to='/search'>
    //             <Tab
    //             icon={<MapsPersonPin />}
    //             label="SEARCH"
    //             />
    //         </Link>
    //     </Tabs>
    // </MuiThemeProvider>
}

export default Header