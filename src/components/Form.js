import React, { Component } from 'react'
// import axios from 'axios'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userSignIn: '',
            passSignIn: '',
            userSignUp: '',
            passSignUp: ''
            // isMember: ''
        }
        // this.signUp = this.signUp.bind(this)
        // this.signIn = this.signIn.bind(this)
        this.updateUserIn = this.updateUserIn.bind(this)
        this.updatePassIn = this.updatePassIn.bind(this)
        this.updateUserUp = this.updateUserUp.bind(this)
        this.updatePassUp = this.updatePassUp.bind(this)
    }

    

    
    updateUserIn(e) {
        this.setState({
            userSignIn: e.target.value
        })
    }
    
    updateUserUp(e) {
        this.setState({
            userSignUp: e.target.value
        })
    }

    updatePassIn(e) {
        this.setState({
            passSignIn: e.target.value
        })
    }

    updatePassUp(e) {
        this.setState({
            passSignUp: e.target.value
        })
    }

    
    render() {
        const { userSignIn, userSignUp, passSignIn, passSignUp } = this.state
        return(
            <div className="log-form">
                {this.props.isMember
                ?
                <section className="login">
                    <input placeholder="Username" onChange={this.updateUserIn} className="username" value={this.state.userSignIn} /> 
                    <input placeholder="Password" type="password" onChange={this.updatePassIn} className="password" value={this.state.passSignIn} /> 
                    <button className="sign-button" onClick={() => this.props.signIn(userSignIn, passSignIn)}>Sign In</button>
                    <section className="is-member">
                        <p className="sign-message">Not a member yet? Sign up!</p>
                        <button className="sign-button" onClick={this.props.changeMember}>Sign Up!</button>
                    </section>                
                </section>
                :
                <section className="signup">                
                    <input placeholder="Username" onChange={this.updateUserUp} className="username" value={this.state.userSignUp} /> 
                    <input placeholder="Password" type="password" onChange={this.updatePassUp} className="password" value={this.state.passSignUp} /> 
                    <button className="sign-button" onClick={() => this.props.signUp(passSignUp, userSignUp)}>Sign Up</button>
                    <section className="is-member">
                        <p className="sign-message">Already a member?</p>
                        <button className="sign-button" onClick={this.props.changeMember}>Sign In!</button>
                    </section>
                </section>
                }
            </div>
        )
    }
}
export default Form