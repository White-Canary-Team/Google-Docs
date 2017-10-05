import React, {Component} from 'react';
import Typing, {Backspace} from 'react-typing-animation';
import { slide as Menu } from 'react-burger-menu';
// const myIp=process.env.MY_IP;

class Landing extends Component {
    render() {
        return (
            <div>
                <div className='landing-header'>
                    <p className='google-logo'>Google</p>
                    <Menu right width={ 300 } >
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="test" className="menu-item" href='/meetteam'>Meet The Team</a>
                        <a id="test" className="menu-item" href="#">test</a>
                        <a id="test" className="menu-item" href="#">test</a>
                    </Menu>
                </div>
                
                <div className='landing-main'>
                    <div className='typing-animation-container'>
                        <Typing className='typing-animation'>
                            Create persuasive
                            <Backspace count={10} delay={1000}/> {"impactful"}
                            <Backspace count={11} delay={1000}/> {"meaningful"}
                            <Backspace count={11} delay={1000}/> {"persuasive"}
                            <Backspace count={11} delay={1000}/> {"impactful"}
                            <Backspace count={11} delay={1000}/> {"meaningful"}
                            <Backspace count={11} delay={1000}/> {"persuasive"}
                            <Backspace count={11} delay={1000}/> {"impactful"}
                            <Backspace count={11} delay={1000}/> {"meaningful"}
                            <Backspace count={11} delay={1000}/> {"persuasive"}
                            <Backspace count={11} delay={1000}/> {"impactful"}
                            <Backspace count={11} delay={1000}/> {"meaningful"}
                            <Backspace count={11} delay={1000}/> {"persuasive"}
                            <Backspace count={11} delay={1000}/> {"impactful"}
                            <Backspace count={11} delay={1000}/> {"meaningful"}
                            <Backspace count={11} delay={1000}/> {"persuasive"}
                            <Backspace count={11} delay={1000}/> {"impactful"}
                            <Backspace count={11} delay={1000}/> {"meaningful"}
                            <Backspace count={11} delay={1000}/> {"persuasive"}
                            <Backspace count={11} delay={1000}/> {"impactful"}
                        </Typing>
                        <p className='typing-animation-documents'>documents</p>
                    </div>
                        <p className='with-google-docs'>With Google Docs, you can write, edit, and collaborate wherever you are. For free.</p>
                        <a alt='go to google' href='http://192.168.3.71:3001/auth' className="go-to-google-button">Go to Google Docs</a>
                </div>

                <div className='do-more-together'>
                    <div className='do-more-together-images'>
                        <img alt='kim' className='kim' src='https://www.google.com/docs/about/images/common/add-kim.jpg' />
                        <img alt='tom' className='tom' src='https://www.google.com/docs/about/images/common/add-tom.jpg' />
                        <img alt='pam' className='pam' src='https://www.google.com/docs/about/images/common/add-pam.jpg' />
                        <img alt='do-more' className='do-more-button' src='https://i.imgur.com/jjlFmqg.png' />
                    </div>
                    <div className='do-more-together-text'>
                        <p className='do-more'>Do more, together</p>
                        <p className='everyone-work-together'>With Google Docs, everyone can work together in the same document at the same time</p>
                        <hr />
                        <a>Share with anyone</a>
                        <hr />
                        <a>Edit in real-time</a>
                        <hr />
                        <a>Chat & comment</a>
                        <hr />
                    </div>
                </div>

                <div className='get-to-your-documents-container'>
                    <div>
                        <p className='get-to'>Get to your documents anywhere, anytime</p>
                        <p className='access-and-create'>Access, create, and edit your documents wherever you go — from your phone, 
                            tablet, or computer — even when there's no connection.</p>
                        <button className='download-app-button'>Download the App</button>
                    </div>
                    <img alt='get to your documents' className='phone-tablet-image' src='https://i.imgur.com/mFg0Rrz.png' />
                </div>

            </div>
        );
    }
}

export default Landing;