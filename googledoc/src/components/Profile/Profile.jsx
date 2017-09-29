import React, { Component } from 'react';
import Header from '../Header/Header.jsx'
import axios from 'axios'
import { connect } from 'react-redux'




class Profile extends Component {
    constructor(){
        super();
        this.state={
            newUserName: ''
        }
        this.updateUserName = this.updateUserName.bind(this);
        this.submitNewUsername = this.submitNewUsername.bind(this)
    }
    
    updateUserName(event){
        this.setState({ newUserName: event})
    }

    submitNewUsername(){
        let config = {
            userId: this.props.userId,
            newUsername: this.state.newUserName
        }
        axios.put('/update-username', config);
    }
    render() {
    
        console.log(this.state.test)
        return (
            <div className='profile-main-wrapper'>
                <Header />
                <div className='profile-banner'>
                    <img className='profile-page-user-pic' src={this.props.userPic} />
                    <div className='profile-page-email'> {this.props.email} </div>
                </div>
                <div className="edit-username-container">  
                    <h1 className='edit-username-text'>Username</h1> <input type="text" value={this.state.newUserName} onChange={(event) => this.updateUserName(event.target.value)}className="username-input" placeholder={this.props.email} /> <button onClick={()=> this.submitNewUsername()}> Submit </button>
                </div>
                <div className='document-username-divider'> </div>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        email: state.email,
        userPic: state.userPic,
        userId: state.userId
    }
}
export default connect(mapStateToProps)(Profile)
