import React, { Component } from 'react';
import Header from '../Header/Header.jsx'
import axios from 'axios'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SheetIcon from 'material-ui/svg-icons/action/view-list';
import DocIcon from 'material-ui/svg-icons/action/subject';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'



class Profile extends Component {
    constructor(){
        super();
        this.state={
            newUserName: ''
        }
        this.updateUserName = this.updateUserName.bind(this);
        this.submitNewUsername = this.submitNewUsername.bind(this);
        this.handleUppercase = this.handleUppercase.bind(this)
    }
    handleUppercase(title){
        title=title.split(' ')
        let words=[]
        for (let i=0;i<title.length;i++){
            let wordArr=title[i].split('')
            let first = wordArr.shift().toUpperCase();
            wordArr.unshift(first);
            words.push(wordArr.join(''));
        }
        let newTitle = words.join(' ')
        return newTitle
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
                <Link to={quillLink}> 
                    <div className="doc-box " style={{ border: docStyle }} key={i}> 
                        <DocIcon style={{color:'#5276d0', margin:'0px 4px 0px -2px'}} id='doc-icon'/>
                        <span>{`${this.handleUppercase(c.title)} ${c.title==='untitled document'?c.id:''}`}
                        </span>
                    </div>
                </Link> :
                <Link to={sheetLink}> 
                    <div className="doc-box" style={{ border: docStyle }} key={i}>
                        <SheetIcon style={{color:'#31884a', marginRight:'4px', height:'20px'}}/>  
                        <span>{`${this.handleUppercase(c.title)} ${c.title==='untitled document'?c.id:''}`}
                        </span>
                    </div>
                </Link>

            return (docLink)
        }) : null
        return (
        <MuiThemeProvider>

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
        </MuiThemeProvider>

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
