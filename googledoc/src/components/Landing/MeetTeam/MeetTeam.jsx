import React, {Component} from 'react';
import github from './github.svg';
import linkedIn from './linkedin.svg';
import twitter from './twitter.svg';

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
                            <div className='social-media'>
                                <div className='social-media-icons' >
                                    <a href='https://github.com/Chris502' ><img src={github}/></a>
                                    <a href='https://www.linkedin.com/in/chris-anderson-b90870142/' ><img src={linkedIn}/></a>
                                    {/* <a href='https://twitter.com/FIFA_fanatic' ><img src={twitter}/></a> */}
                                </div>
                            </div>
                            <img
                                className='chris-photo'
                                src='https://i.imgur.com/zN9HT1t.jpg'/>
                            <div className='chris-text-container'>
                                <h1 className='meet-name'>Chris</h1>
                                <br/>
                                <p>Hometown: Louisville, Kentucky</p>
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
                                <p>Hometown: Seattle, Washington</p>
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
                                src='https://i.imgur.com/AKRHth7.jpg'/>
                            <div className='social-media'>
                                <div className='social-media-icons' >
                                    <a href='https://github.com/rustonrr' ><img src={github}/></a>
                                    <a href='https://www.linkedin.com/in/ruston-reformado-94279391/' ><img src={linkedIn}/></a>
                                    {/* <a href='https://twitter.com/rustonrr' ><img src={twitter}/></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className='alex-container'>
                        <div className='meet-picture-and-text'>
                            <div className='social-media'>
                                <div className='social-media-icons' >
                                    <a href='https://github.com/AlexHill5' ><img src={github}/></a>
                                    <a href='https://www.linkedin.com/in/alex-hill-a44407130/' ><img src={linkedIn}/></a>
                                    {/* <a href='https://twitter.com/AlexHill5' ><img src={twitter}/></a> */}
                                </div>
                            </div>
                            <img
                                className='alex-photo'
                                src='https://i.imgur.com/8pjivIX.jpg'/>
                            <div className='alex-text-container'>
                                <h1 className='meet-name'>Alex</h1>
                                <br/>
                                <p>Hometown: Salt Lake City, Utah</p>
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
                                <p>Hometown: Salt Lake City, Utah</p>
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
                                src='https://i.imgur.com/ya9bLpI.png'/>
                            <div className='social-media'>
                                <div className='social-media-icons' >
                                    <a href='https://github.com/CharlesMurphy94' ><img src={github}/></a>
                                    <a href='https://www.linkedin.com/in/charles-murphy-823ba993/' ><img src={linkedIn}/></a>
                                    {/* <a href='http://www.twitter.com/_Chuckiecheeze' ><img src={twitter}/></a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeetTeam;