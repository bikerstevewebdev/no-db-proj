import React from 'react'
import { Link } from 'react-router-dom'



function Replay(props) {

    const { isFav, makeFav, keyId, name } = props

    function addFav(val) {
        console.log("a fav has been made!", val)
        makeFav(isFav, keyId)
    }
    return(
        
        <div id={keyId} className="replay-item">
            <h3>{name}</h3>
            <a style={{"color": `${isFav ? "gold" : "black"}`}} onClick={() => addFav(isFav)}><i className={"fa fa-star"} ></i></a>
            <button>
                <Link to={ { 
                pathname: "/game", 
                state: { foodId: keyId }
                }}>
                    Play
                </Link>
            </button>
        </div>
    )
}

export default Replay