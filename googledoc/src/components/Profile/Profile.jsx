import React, { Component } from 'react';
import Header from '../Header/Header.jsx'
import axios from 'axios'
import { connect } from 'react-redux'




class Profile extends Component {


    render() {
    
   
        return (
            <div className='profile-main-wrapper'>
                <Header />
                <div className='profile-banner'>
                    <img className='profile-page-user-pic' src={this.props.userPic} />
                    <div className='profile-page-email'> {this.props.email} </div>
                </div>
                <div className="edit-username-container">  
                    <h1 className='edit-username-text'>Username</h1>  <input type="text" className="username-input" placeholder={this.props.email} />
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
    }
}
export default connect(mapStateToProps)(Profile)
