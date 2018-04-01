import React, { Component } from 'react'
import Replay from './Replay'
import axios from 'axios'
import Header from './Header'
import './css/Search.css'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'



class Search extends Component {
    constructor() {
        super()
        this.state = {
            replays: [],
            searchInput: '',
            nameInput: '',
            messageInput: '',
            macroInput: '',
            recipe: '',
            recipeP: '',
            recipeF: '',
            recipeC: '',
            recipeImg: '',
            recipeLink: '',
            open: false
        }
        this.updateInput = this.updateInput.bind(this)
        this.updateNameInput = this.updateNameInput.bind(this)
        this.updateMessageInput = this.updateMessageInput.bind(this)
        this.updateMacroInput = this.updateMacroInput.bind(this)
        this.getReplays = this.getReplays.bind(this)
        this.setFav = this.setFav.bind(this)
        this.search = this.search.bind(this)
        this.removeFood = this.removeFood.bind(this)
        this.addFood = this.addFood.bind(this)
        this.getRecipe = this.getRecipe.bind(this)
    }


    componentDidMount(){
        this.getReplays()
    }
    
    getReplays() {
        axios.get('/api/foods').then(res => {
            this.setState({
                replays: res.data
            })
        })
    }

    setFav(favStatus, id) {
        axios.put(`/api/foods/replay/${id}`, { favStatus }).then(res => {
            console.log(res.data[0], res.data[1])
          this.setState({
            replays: res.data
          })
        })
    }    

    updateInput(e) {
        this.setState({
            searchInput: e.target.value
        })
    }


    updateNameInput(e) {
        this.setState({
            nameInput: e.target.value
        })
    }

    updateMessageInput(e) {
        this.setState({
            messageInput: e.target.value
        })
    }

    updateMacroInput(e) {
        console.log(e.target.value)
        this.setState({
            macroInput: e.target.value
        })
    }

    removeFood(id) {
        axios.delete(`/api/foods/replay/${id}`).then(res => {
            this.setState({
                replays: res.data
            })
        })
    }

    search(e) {
        const { searchInput } = this.state
        console.log("Testing search readiness", searchInput)
        if(e.key){
            if(e.key === "Enter" && searchInput.length > 0){
                console.log("Search has begun!")
                axios.get(`/api/foods/search?name=${searchInput}`).then(res => {
                    this.setState({
                        replays: res.data
                    })
                })}
            } else if(e === "search"){
                console.log("Search has begun!")                
                axios.get(`/api/foods/?name=${searchInput}`).then(res => {
                    this.setState({
                        replays: res.data
                    })
                })
            }
    }

    addFood() {
        const { nameInput, macroInput, messageInput } = this.state
        axios.post('/api/foods', {name: nameInput, macro: macroInput, message: messageInput}).then(res => {
            this.setState({
                replays: res.data,

            })
        })
    }

    getRecipe(id) {
        axios.get(`/api/foods/replay/recipe/${id}`).then(res => {
            this.setState({
                open: true,
                recipeImg: res.data.img,
                recipeP: res.data.p,
                recipeF: res.data.f,
                recipeC: res.data.c,
                recipeLink: res.data.recipeLink,
                recipe: res.data.recipe
            })
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }


    render() {
        const replayArr = this.state.replays.map((v, i) => {
            return (<Replay removeFood={this.removeFood} isFav={v.isFav} makeFav={this.setFav} keyId={i} key={`item-${i}`} name={v.name} />)
        })
        return(
            <div className="search-page">
                <div className="bg-img">
                </div>
                <Header />
                <section className="search-header">
                    <h1 id="pick">Pick a Food!</h1>
                    <input placeholder="Search by name" value={this.state.searchInput} onChange={this.updateInput} onKeyPress={this.search}
                    className="search"/>
                    <a onClick={() => this.search("search")}><i className="fas fa-search"></i></a>
                </section>
                <div className="replay-array">
                    {replayArr}
                </div>

                <div className="filler">
                </div>

                <div className="second-img">
                    <section className="add-message">
                        <h2 className="cant-find">
                            Can't find the food you're looking for?
                        </h2>
                        <span className="add-it">
                            Go ahead and add it to the list! Just be sure to do your research and put in the correct information so everybody can benefit:)
                        </span>
                    </section>
                    <form className="add-item">
                        <input placeholder="Food Name" type="text" onChange={this.updateNameInput}/>
                        <input value={this.state.macroInput} onChange={this.updateMacroInput} placeholder={`Predominant macro, either "protein", "carb", or "fat".`}/>
                        <input onChange={this.updateMessageInput} placeholder="An informational tid bit to pass along." type="text-area"/>
                        <button className="send-it" type="submit" onClick={this.addFood}>Send it!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search