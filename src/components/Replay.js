import React from 'react'
import { Link } from 'react-router-dom'



function Replay(props) {

    const { isFav, makeFav, keyId, name, removeFood, getRecipe } = props

    function addFav() {
        makeFav(isFav, keyId)
    }

    function destroy() {
        removeFood(keyId)
    }

    function reqRecipe() {
        getRecipe(keyId)
    }
    return(
        
        <div id={keyId} className="replay-item">
            <h3>{name}</h3>
            <a style={{"color": `${isFav ? "gold" : "black"}`}} onClick={() => addFav(isFav)}><i className={"fa fa-star"} ></i></a>
            <a onClick={() => destroy()}><i className="far fa-trash-alt"></i></a>
            <a onClick={() => reqRecipe(keyId)}><i className="far fa-trash-alt"></i></a>
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