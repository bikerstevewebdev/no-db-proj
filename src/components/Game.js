import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import './css/Game.css'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'




class Game extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            macro: '',
            img: '',
            name: '',
            message: '',
            gameMsg: '',
            protein: '',
            carb: '',
            fat: '',
            open: false
        }
        this.guess         = this.guess.bind(this)
        this.getMacros     = this.getMacros.bind(this)
        this.success       = this.success.bind(this)
        this.niceTry       = this.niceTry.bind(this)
        this.newGame       = this.newGame.bind(this)
        this.handleClose   = this.handleClose.bind(this)
    }

    componentDidMount() {
        if(this.props.location.state){
            console.log(this.props.location.state)
            this.replayGame()
        } else{
            this.newGame() 
        }
    }

    
    
    newGame() {
        axios.get('/api/foods/game').then(res => {
            this.setState({
                id: res.data.id,
                macro: res.data.macro,
                img: res.data.resImg,
                name: res.data.name,
                message: res.data.message,
            })
        })
    }
    
    replayGame() {
        const { foodId } = this.props.location.state
        axios.get(`/api/foods/game/replay/${foodId/1}`).then(res => {
            this.setState({
                id: res.data.id,
                macro: res.data.macro,
                img: res.data.resImg,
                name: res.data.name,
                message: res.data.message,
            })
        })
    }
    
    guess(val) {
        const { macro } = this.state
        macro.includes(val) ? this.success() : this.niceTry()
        this.getMacros()
        this.setState({
        })
    }

    getMacros() {
        
        axios.get(`/api/foods/game/${this.state.id}`).then(res => {
            this.setState({
                protein: res.data.p,
                fat: res.data.f,
                carb: res.data.c
            })
        })
    }

    success() {
        this.setState({
            open: true,
            gameMsg: "Nice job!"
        })
    }

    niceTry() {
        this.setState({
            open: true,
            gameMsg: "Not quite!"
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }


    render() {
        const { name, img, message, protein, fat, carb, gameMsg, open } = this.state
        const actions = [
            <FlatButton
              label="Play Again?"
              primary={true}
              onClick={this.newGame}
            />,
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />,
          ];
      
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
                <MuiThemeProvider>
                    <Dialog title={gameMsg} actions={actions} modal={false} open={open} onRequestClose={this.handleClose} >
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
                            
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}




export default Game