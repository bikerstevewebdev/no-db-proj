import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import Form from './Form'
import Replay from './Replay'
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
            open: false,
            dietLabels: [],
            isLoggedIn: false,
            userName: '',
            pass: '',
            userId: '',
            isMember: false
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
        this.handleClose = this.handleClose.bind(this)
        this.changeMember = this.changeMember.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)

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

    getRecipe(name) {
        axios.get(`/api/foods/replay/recipe?name=${name}`).then(res => {
            console.log(res, res.data)
            this.setState({
                open: true,
                recipeImg:  res.data.img,
                recipeP:    res.data.p,
                recipeF:    res.data.f,
                recipeC:    res.data.c,
                recipeLink: res.data.recipeLink,
                recipe:     res.data.recipe,
                dietLabels: res.data.dietLabels
            })
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    // checkLogin(auth, id, name) {
    //     if(auth){
    //         this.setState({
    //             isLoggedIn: true,
    //             userId: id,
    //             username: name
    //         })
    //     }
    // }

    changeMember() {
        this.setState({
            isMember: !this.state.isMember
        })
    }
    
    signIn(userIn, passIn) {
        axios.post('/api/users/login', { name: userIn, pass: passIn }).then(res => {
            if(res.data.valid){
                this.setState({
                    isLoggedIn: true,
                    userName: userIn,
                    pass: passIn,
                    userId: res.data.id
                })
                alert(`Welcome back ${userIn}`)
            } else{
                alert(res.data.message)
            }
        })
    }

    signUp(pass, name) {
        axios.post('/api/users/signup', { pass, name }).then(res => {
            if(res.data.auth){
                this.setState({
                    isLoggedIn: true,
                    userName: name,
                    pass,
                    id: res.data.id
                })
                alert(res.data.message)
            } else if(!res.data.auth){
                alert(res.data.message)
            }
        })
    }

    render() {
        const replayArr = this.state.replays.map((v, i) => {
            return (<Replay isLoggedIn={this.state.isLoggedIn} removeFood={this.removeFood} isFav={v.isFav} makeFav={this.setFav} getRecipe={this.getRecipe} keyId={i} key={`item-${i}`} name={v.name} />)
        })
        const { open, recipeP, recipeC, recipeF, recipe, recipeImg, dietLabels, recipeLink, isLoggedIn } = this.state
        const dietArr = dietLabels.map((v, i) => {
            return <em key={i}>{v}</em>
        })
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />,
          ];
        return(
            <div className="search-page">
                <div className="bg-img">
                </div>
                <Header />
                <section className="search-header">
                    {isLoggedIn ? null : <Form signIn={this.signIn} areMember={this.changeMember} signUp={this.signUp} isMember={true} loginStatus={this.checkLogin} />}
                    <h1 id="pick">Pick a Food!</h1>
                    <input placeholder="Search by name" value={this.state.searchInput} onChange={this.updateInput} onKeyPress={this.search}
                    className="search"/>
                    <a onClick={() => this.search("search")}><i className="fas fa-search"></i></a>
                    {isLoggedIn ? null : <Form signIn={this.signIn} areMember={this.changeMember} signUp={this.signUp} isMember={false} loginStatus={this.checkLogin} />}
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
                <MuiThemeProvider>
                    <Dialog title={ recipe } actions={ actions } modal={false} open={ open } onRequestClose={this.handleClose} >
                        <div className="recipe">
                            <figure className="recipe-img-cont">
                                <h3>{ recipe }</h3>
                                <a href={ recipeLink } className="recipe-link" ><img className="recipe-img" src={ recipeImg } alt={ recipe }/></a>
                                <figcaption>
                                    <p className="diet-labels">
                                        { dietArr }
                                    </p>
                                </figcaption>
                            </figure>
                            <p className="protein">
                                Protein: { recipeP }
                            </p>
                            <p className="fat">
                                Fat: { recipeF }
                            </p>
                            <p className="carb">
                                Carb: { recipeC }
                            </p>
                        </div>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Search