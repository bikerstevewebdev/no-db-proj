import React, { Component } from 'react'
import './App.css'
// import Game from './components/Game'
import Header from './components/Header'
// import Replay from './components/Replay'
import { Link } from 'react-router-dom'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      // replayFoods: [],
      img1: '',
      img1Pro: '',
      img2: '',
      img2Pro: '',

    }
  }

  componentDidMount() {
    axios.get('/api/foods/pics').then(res => {
      let imgOne    = res.data[0].urls.custom,
          imgTwo    = res.data[1].urls.custom,
          imgOnePro = res.data[0].user.name,
          imgTwoPro = res.data[1].user.name
      this.setState({
        img1: imgOne,
        img2: imgTwo,
        img1Pro: imgOnePro,
        img2Pro: imgTwoPro
      })
    })
    // Don't need the foods array right now, maybe later if updates are made to the app
    
    // axios.get('/api/foods').then(res => {
    //   this.setState({ foods: res })
    // })
  }

  // addReplay(item) {
  //   let newArr = this.state.replayFoods
  //   // newArr.push(item)
  //   axios.put(`/api/foods/replay/${item}`).then(res => {

  //     this.setState({
  //       replayFoods: newArr
  //     })
  //   })
  // }





  render() {
    const { img1, img2, img1Pro, img2Pro } = this.state
    // Replays disbanded for now
    // const replayArr = this.state.replayFoods.map((item, i) => {
    //   return <Replay onHandleClick={this.playAgain} name={item.name} key={i}/>
    // })
    // Replays disbanded for now
    return (
      <div className="App">
        <Header />
        <header className="app-header">
        <figure>
          <img src={img1} width="300" height="250" alt="food item 2"/>
          <figcaption>
            Photo by {img1Pro} on Unsplash
          </figcaption>
        </figure>
          <h1 className="title"><span id="left-head">N</span>ame That Macro</h1>
        <figure>
            <img src={img2} width="300" height="250" alt="food item 2"/>  
          <figcaption>
            Photo by {img2Pro} on Unsplash
          </figcaption>
        </figure>
        </header>
        <section className="intro">
          <h2 className="head">What's a Macro?</h2>
          <p className="intro-p">A "macro", short for macronutrient, meaning one of the larger nutrients that make up one's  diet. The main 3 macros are protein, carbs (carbohydrates) and fat. we won't get too heavy into the details because it can be confusing enough already. Every food contains a certain amount of each macro, and these macros provide a set number of calories per gram present in food: 4 calories per gram of carb and protein each, and 9 calories per gram of fat. A common misunderstanding is what a certain food is made up most of in terms of macros. This game is to help you understand the typical make-up of common foods to help clarify your understanding on a base level of what foods contain more of each macro. read below how to play and click on "Play Game!" when you are ready to learn!</p>
        </section>
        <section className="how-to">
          <h3 className="how-to-h3">How to Play</h3>
          <p className="instructions">When  you see the food displayed on the page, try to guess which macro is the prime makeup of that food item. But watch out! Some might surprise you. When you have clicked on a macro button, the answer will be revealed. Take the time to read the message to learn a nice tid bit about the food before clicking "Play Again" to test your knowledge on other food.</p>
        </section>
        <button className="play-btn"><Link  to="/game">Play Game!</Link></button>
      </div>
    )
  }
}

export default App
