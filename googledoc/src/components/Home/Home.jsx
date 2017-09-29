import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd, getID, getDocs } from './../../ducks/reducer.js'
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
            
            axios.post('/user', {
                email: this.state.emails,
            })
        })
        axios.get('/allUsers').then(response =>{
            if(this.state.emails){
                let uid = response.data.filter((e)=>{
                    if(e.email === this.state.emails){
                      
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
        //axios.get('/documents').then(response =>{
        //    console.log(response.data)
        //    this.setState({
        //        documents: response.data
        //    })
        //})
}
componentDidMount(){
    this.props.getDocs()
    
}
handleQuill(){
    axios.post('/quill', {
        title: "untitled document",
        creator: this.props.userId,
        doctype: "word"
    })
}

handleSheet(){
    axios.post('/jsheets', {
        title: "untitled document",
        creator: this.props.userId,
        doctype: "excel"
    })
}





    render() {
        let filteredDoc = this.props.documents ? this.props.documents.filter((e) =>{
            if(e.creator === this.props.userId){
                return e
            }
            return null
                           
        }): null
        console.log(filteredDoc) 
        let myDocs = filteredDoc ? filteredDoc.map((c,i)=>{
            console.log("C", c)
            let quillLink = `/quill/${c.id}`;
            let sheetLink = `/sheets/${c.id}`;
            let docStyle = c.doctype === 'word' ? "2px solid #90CAF9": "2px solid #A5D6A7"
            let docLink = c.doctype === 'word' ? 
            <Link to={quillLink}> <Paper className="doc-box" style={{border: docStyle}} zDepth={2}  key={i} rounded={false}> {c.title} {c.id}</Paper></Link> :
            <Link to={sheetLink}> <Paper className="doc-box" style={{border: docStyle}} zDepth={2} key={i}  rounded={false}>{c.title} {c.id}</Paper></Link>
            
            return( docLink)
            
            
        }): null
        let loader =  this.props.loading ? <div className="loader"> <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div>:myDocs

        console.log(this.props.loading)
        let style = {
            height: 100,
            width: 100,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
            padding: 20
        };
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
                            
                            {loader}
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
        userId: state.userId,
        loading: state.loading,
        documents: state.documents
    }
}
export default connect(mapStateToProps, { emailAdd, getID, getDocs })(Home)