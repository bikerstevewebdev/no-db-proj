import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Search from './components/Search'
import Game from './components/Game'




// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/game" component={Game} />
                <Route path="/search" component={Search} />
            </Switch>
    </Router>


    , document.getElementById('root'))
// registerServiceWorker();
