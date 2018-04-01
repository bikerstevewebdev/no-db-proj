import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import './css/Game.css'


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            macro: '',
            img: '',
            name: '',
            message: '',
            isPlaying: true,
            protein: '',
            carb: '',
            fat: ''
        }
        this.guess     = this.guess.bind(this)
        this.getMacros = this.getMacros.bind(this)
        this.success   = this.success.bind(this)
        this.niceTry   = this.niceTry.bind(this)
        this.newGame   = this.newGame.bind(this)
    }

    componentDidMount() {
        this.newGame()
    }

    guess(val) {
        const { macro } = this.state
        macro.includes(val) ? this.success() : this.niceTry()
        this.getMacros()
        this.setState({
            isPlaying: false,
        })
    }

    replayGame() {
        const { foodId } = this.props.location.state
        axios.get(`/api/foods/${foodId}`).then(res => {
            this.setState({
                id: res.data.id,
                macro: res.data.macro,
                img: res.data.resImg,
                name: res.data.resName,
                message: res.data.message,
                isPlaying: true
            })
        })
    }

    newGame() {
        axios.get('/api/foods/game').then(res => {
            this.setState({
                id: res.data.id,
                macro: res.data.macro,
                img: res.data.resImg,
                name: res.data.name,
                message: res.data.message,
                isPlaying: true
            })
        })
    }

    getMacros() {
        
        axios.get(`/api/foods/game/replay/${this.state.id}`).then(res => {
            this.setState({
                protein: res.data.p,
                fat: res.data.f,
                carb: res.data.c
            })
        })
    }

    success() {
        alert("Great job!")
    }

    niceTry() {
        alert("Nice try. Check out the message for some explanation and you'll surely get it next time:)")
    }

    render() {
        const { name, img, isPlaying, message, protein, fat, carb } = this.state
        return(
            <div className="game">
                <Header />
                <section className="game-header">
                    <img src={ img } alt={ name }/>
                    <h2 className="game-name">{ name }</h2>
                </section>
                <section className="btns">
                    <button onClick={ () => this.guess('fat')}>Fat</button>
                    <button onClick={ () => this.guess('protein')}>Protein</button>
                    <button onClick={ () => this.guess('carb')}>Carb</button>
                </section>
                
                {isPlaying ? null : (
                <div className="game-over">
                    <h3>Actual Macros</h3>
                    <p>
                        Protein: {protein}
                    </p>
                    <p>
                        Fat: {fat}
                    </p>
                    <p>
                        Carb: {carb}
                    </p>
                    <p className="message">
                        { message }
                    </p>
                    <button className="play-again" onClick={this.newGame}>
                        Play Again?
                    </button>
                </div>)}
            </div>
        )
    }
}




export default Game