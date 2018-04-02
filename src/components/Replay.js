import React from 'react'
import { Link } from 'react-router-dom'



function Replay(props) {

    const { isFav, makeFav, keyId, name, removeFood, getRecipe, isLoggedIn } = props

    function addFav() {
        makeFav(isFav, keyId)
    }

    function destroy() {
        removeFood(keyId)
    }

    function reqRecipe() {
        getRecipe(name)
    }
    return(
        
        <div id={keyId} className="hvr-bob replay-item">
            <section className="replay-name">
                <h3>{name}</h3>
            </section>
            <section id="replay-btns">
                { isLoggedIn ? 
                <a style={{"color": `${isFav ? "gold" : "black"}`}} onClick={() => addFav(isFav)}><i className={"fa fa-star"} ></i></a>
                : null}
                <a onClick={() => destroy()}><i className="far fa-trash-alt"></i></a>
                <a className="read" onClick={() => reqRecipe()}><i className="fab fa-readme"></i></a>
                <button>
                    <Link style={{color: "rgba(255, 255, 255, 0.858)"}} to={ { 
                        pathname: "/game", 
                        state: { foodId: keyId }
                    }}>
                        Play
                    </Link>
                </button>
            </section>
        </div>
    )
}

export default Replay