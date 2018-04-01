import React, { Component } from 'react'
import Replay from './Replay'
import axios from 'axios'
import Header from './Header'
import './css/Search.css'


class Search extends Component {
    constructor() {
        super()
        this.state = {
            replays: [],
            searchInput: '',
            pInput: '',
            fInput: '',
            cInput: '',
            nameInput: '',
            messageInput: '',
            macroInput: ''
        }
        this.updateInput = this.updateInput.bind(this)
        this.updateNameInput = this.updateNameInput.bind(this)
        this.updateMessageInput = this.updateMessageInput.bind(this)
        this.updateMacroInput = this.updateMacroInput.bind(this)
        this.getReplays = this.getReplays.bind(this)
        this.setFav = this.setFav.bind(this)
        this.search = this.search.bind(this)
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


    render() {
        const replayArr = this.state.replays.map((v, i) => {
            return (<Replay isFav={v.isFav} makeFav={this.setFav} keyId={i} key={`item-${i}`} name={v.name} />)
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
                        <input placeholder="An informational tid bit to pass along." type="text-box"/>
                        <input value={this.state.macroInput} onChange={this.updateMacroInput} placeholder={`Predominant macro, either "protein", "carb", or "fat".`}/>
                        <button className="send-it" type="submit" onClick={this.addFood}>Send it!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search