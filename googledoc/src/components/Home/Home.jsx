import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd, getID } from './../../ducks/reducer.js'
import Header from './../Header/Header.jsx'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Home extends Component {
    constructor() {
        super();
        this.state = {
            emails: '',
            userId: '',
            documents: [],
            userName: '',
            searchTerm: '',
            pic: ''
        }
    this.handleQuill = this.handleQuill.bind(this)
    this.handleSheet = this.handleSheet.bind(this)
    }
    componentWillMount() {
        axios.get('/user').then(response => {
            this.setState({
                emails: response.data.emails[0].value,
                pic: response.data.picture

            })
            this.props.emailAdd(this.state.emails, this.state.pic)
            4
            axios.post('/user', {
                email: this.state.emails,
            })
        })
        axios.get('/allUsers').then(response =>{
            if(this.state.emails){
                let uid = response.data.filter((e)=>{
                    if(e.email === this.state.emails){
                      console.log(uid)
                        return e.id
                    }
                    return null
                })
                this.setState({
                    userId: uid[0].id
                })
                this.props.getID(this.state.userId)
            }


    })
}
handleQuill(){
    axios.post('/quill', {
        title: "untitled document",
        creator: this.props.userId
    })
}

handleSheet(){
    axios.post('/jsheets', {
        title: "untitled document",
        creator: this.props.userId
    })
}




    render() {
        let style = {
            height: 100,
            width: 100,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
            padding: 20
        };
        console.log(this.props.userId)
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <div className="new-doc-box">
                        <p> New Document</p>
                        <div className="new-doc">
                            <Paper className="doc-box" zDepth={2} rounded={false} onClick={this.handleQuill}>New Quill</Paper>
                            <Paper className="doc-box" zDepth={2} rounded={false} onClick={this.handleSheet}>New Sheet</Paper>

                        </div>

                    </div>
                    <div className="recent-doc">
                        <p>Recent Documents</p>

                        <div className='my-docs'>
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />

                        </div>


                    </div>

                </div>
            </MuiThemeProvider>
        )
    }
}
function mapStateToProps(state) {
    return {
        email: state.email,
        userPic: state.userPic,
        userId: state.userId
    }
}
export default connect(mapStateToProps, { emailAdd, getID })(Home)