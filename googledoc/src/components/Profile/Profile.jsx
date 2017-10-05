import React, { Component } from 'react';
import Header from '../Header/Header.jsx'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



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
    
        console.log(this.props.documents)
    
        let userDocs = this.props.documents.filter ( e => {
            console.log(e.creator, 'asdjflasf')
            if (e.creator === this.props.userId){
                return e 
            } 
        })
        console.log(userDocs)


        let myDocs = userDocs ? userDocs.map((c, i) => {
            let quillLink = `/quill/${c.id}`;
            let sheetLink = `/sheets/${c.id}`;
            let docStyle = c.doctype === 'word' ? "2px solid #90CAF9" : "2px solid #A5D6A7"
            let docLink = c.doctype === 'word' ?
                <Link to={quillLink}> <div className="doc-box" style={{ border: docStyle }} zDepth={2} key={i} rounded={false}> {c.title} {c.id}</div></Link> :
                <Link to={sheetLink}> <div className="doc-box" style={{ border: docStyle }} zDepth={2} key={i} rounded={false}>{c.title} {c.id}</div></Link>

            return (docLink)


        }) : null
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
                <div className='profile-documents-container'> 
                    {myDocs}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        email: state.email,
        userPic: state.userPic,
        userId: state.userId,
        documents: state.documents,
    }
}
export default connect(mapStateToProps)(Profile)
