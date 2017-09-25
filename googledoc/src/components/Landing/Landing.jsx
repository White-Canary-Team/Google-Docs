import React, { Component } from 'react';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className='landing-header'>
                    <p className='google-logo'>Google</p>
                    <a className='login-button' href="http://localhost:3001/auth"><button>Log In</button></a>
                </div>
                <div className='landing-main'>
                    <a href="#" className="go-to-google-button">Go to Google Docs</a>
                </div>
            </div>
        );
    }
}

export default Landing;