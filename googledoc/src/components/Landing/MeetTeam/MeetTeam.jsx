import React, {Component} from 'react';

import {slide as Menu} from 'react-burger-menu';

class MeetTeam extends Component {
    render() {
        return (
            <div>
                <div className='landing-header'>
                    <p className='google-logo'>Google</p>
                    <Menu right width={300}>
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="test" className="menu-item" href='#'>test</a>

                    </Menu>
                </div>

                <div className='meet-team-body'>
                    <div className='meet-team-header'>
                        <div className='the-professionals'>
                            <p>The</p>
                            <p>Professionals.</p>
                        </div>
                        <div>
                            <p className='were-proud'>We're proud of our team and always looking for more
                            people with a similar passion & experience for online marketing. If that's you,
                            email us at mrjackinamonkey@google.com.</p>
                        </div>
                    </div>
                    <hr/>
                    <div className='chris-container'>
                        <div className='meet-picture-and-text'>
                            <img
                                className='chris-photo'
                                src='https://timedotcom.files.wordpress.com/2017/06/170615-stock-market-predictions-marc-faber1.jpg?w=300'/>
                            <div className='chris-text-container'>
                                <h1 className='meet-name'>Chris</h1>
                                <br/>
                                <p>City</p>
                                <br/>
                                <p className='meet-description'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='ruston-container'>
                        <div className='meet-picture-and-text'>
                            <div className='ruston-text-container'>
                                <h1 className='meet-name'>Ruston</h1>
                                <br/>
                                <p>City</p>
                                <br/>
                                <p className='meet-description'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <img
                                className='ruston-photo'
                                src='https://timedotcom.files.wordpress.com/2017/06/170615-stock-market-predictions-marc-faber1.jpg?w=300'/>
                        </div>
                    </div>
                    <hr/>
                    <div className='alex-container'>
                        <div className='meet-picture-and-text'>
                            <img
                                className='alex-photo'
                                src='https://timedotcom.files.wordpress.com/2017/06/170615-stock-market-predictions-marc-faber1.jpg?w=300'/>
                            <div className='alex-text-container'>
                                <h1 className='meet-name'>Alex</h1>
                                <br/>
                                <p>City</p>
                                <br/>
                                <p className='meet-description'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='charlie-container'>
                        <div className='meet-picture-and-text'>
                            <div className='charlie-text-container'>
                                <h1 className='meet-name'>Charlie</h1>
                                <br/>
                                <p>City</p>
                                <br/>
                                <p className='meet-description'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <img
                                className='charlie-photo'
                                src='https://timedotcom.files.wordpress.com/2017/06/170615-stock-market-predictions-marc-faber1.jpg?w=300'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetTeam;