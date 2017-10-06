import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd, getID, getDocs } from './../../ducks/reducer.js'
import Header from './../Header/Header.jsx'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SheetIcon from 'material-ui/svg-icons/action/view-list';
import DocIcon from 'material-ui/svg-icons/action/subject';
import AddIcon from 'material-ui/svg-icons/content/add';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import AutoComplete from 'material-ui/AutoComplete'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';




class Home extends Component {
    constructor() {
        super();
        this.state = {
            emails: '',
            userId: '',
            users: [],
            documents: [],
            userName: '',
            searchTerm: '',
            pic: '',
            refresh : true,
            sheetModal: false,
            sheetTitle: '',
            sheetEditors: '',
            docModal: false,
            docTitle: '',
            docEditors: '',
            goToDoc:true,
            goToSheet: true,
            // redirect: false,
        }
        this.handleQuill = this.handleQuill.bind(this)
        this.handleSheet = this.handleSheet.bind(this)
        // this.handleSheetTitle = this.handleSheetTitle.bind(this)
        this.handleSheetEditors = this.handleSheetEditors.bind(this)
        this.handleSheetsUpdate = this.handleSheetsUpdate.bind(this)
        this.handleDocUpdate = this.handleDocUpdate.bind(this)
        this.handleEditorsUpdate = this .handleEditorsUpdate.bind(this)
        this.handleUppercase = this .handleUppercase.bind(this)
        // this.handleCancel = this .handleCancel.bind(this)
        
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
        axios.get('/allUsers').then(response => {
            console.log(response.data[0])
            this.setState({users:response.data})
            if (this.state.emails) {
                let uid = response.data.filter((e) => {
                    if (e.email === this.state.emails) {

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
    componentDidMount() {
        this.props.getDocs();


    } 

    handleQuill() {
        axios.post('/quill', {
            title: "untitled document",
            creator: this.props.userId,
            doctype: "word",
            editors: this.props.userId + this.state.sheetEditors
        })
        this.props.getDocs()
        this.setState({
            docModal: true
        })
    }
   

    handleSheet() {
        axios.post('/jsheets', {
            title: "untitled document",
            creator: this.props.userId,
            doctype: "excel",
            body: '',
            styles: '',
            editors:this.props.userId,
        })
        this.props.getDocs()
        this.setState({
            sheetModal: true
        })
    }

    // handleSheetTitle(e){
    //     this.setState({
    //         sheetTitle: e.target.value
    //     })
    // }

    handleSheetEditors(email){
        // let emails = e.target.value.split(', ');
        // console.log(emails);
        // this.setState({
        //     sheetEditors: e.target.value
        // })
        console.log(email)
        let validEmail = false;
        let usersCopy = this.state.users.slice();
        for (let i=0;i<usersCopy.length;i++){
            if (usersCopy[i].email === email){
                validEmail = true;
                let newEditors = this.state.sheetEditors 
                let thisEditor = newEditors.concat(',' + usersCopy[i].id)
                this.setState({sheetEditors:thisEditor})
            }
        }
        if (!validEmail)alert("Please enter a valid user email")
    }
    handleSheetsUpdate(){
        let findSheetsId = this.props.documents.filter((e) =>{
            if(e.doctype === 'excel'){
                return e
            } return null
        })
        let sheetId = findSheetsId[findSheetsId.length -1]
        let idSheet = sheetId ? sheetId.id : 'hahahaha'
        let tempTitle = this.state.sheetTitle?this.state.sheetTitle:'untitled spreadsheet'
        let tempEditors = this.state.sheetEditors? this.state.userId + this.state.sheetEditors : this.props.userId.toString()
        console.log(tempEditors)
        
        axios.post('/sheetsTitle',{
            title: tempTitle,
            editors: tempEditors,
            id: idSheet
        })

    }

    // handleTitleUpdate(){
    //     axios.post('/jsheet-title',{
    //         title: this.state.sheetTitle
    //     })
    // }
    handleEditorsUpdate(email){
        console.log(email)
        let validEmail = false;
        let usersCopy = this.state.users.slice();
        for (let i=0;i<usersCopy.length;i++){
            if (usersCopy[i].email === email){
                validEmail = true;
                let newEditors = this.state.docEditors 
                let thisEditor = newEditors.concat(',' + usersCopy[i].id)
                this.setState({docEditors:thisEditor})
            }
        }
        if (!validEmail)alert("Please enter a valid user email")
    }

    handleDocUpdate(){
        let findQuillId = this.props.documents.filter((e) =>{
            if(e.doctype === 'word'){
                return e
            } return null
        })
        let qId = findQuillId[findQuillId.length -1]
        let idQuill = qId ? qId.id : 'hahahaha'
        let tempTitle = this.state.docTitle?this.state.docTitle:'untitled document'
        let tempEditors = this.state.docEditors? this.state.userId + this.state.docEditors : this.props.userId.toString()
        console.log(tempEditors)
        
        axios.post('/quillTitle',{
            title: tempTitle,
            editors: tempEditors,
            id: idQuill
        })

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





    render() {
        const knownEmails = [
            'cwmurphy7@gmail.com',
            'rustonreformado@gmail.com',
            'coldfusion22@gmail.com',
            'canderson0289@gmail.com'
        ];


        console.log(this.state.sheetTitle)

        let findSheetId = this.props.documents.filter((e)=>{
            if(e.doctype === 'excel'){
                return e.id
            } return null
        })
        let theId = findSheetId[findSheetId.length-1]
        let idSheet = theId ? theId.id : 'hahah'
        let newSheetLink = '/sheets/'+ idSheet

        // SPREADSHEET MODAL

        let goToSheet = this.state.goToSheet ? 
        <div className="pop-out">
            <p>
                New SpreadSheet
            </p>
            <br/>
            
            <div className='share-dropdown-container'>
            <div>
                <TextField
                hintText="Title"
                value={this.state.sheetTitle}
                onChange={(event,newVal) =>{ this.setState({sheetTitle: newVal})}}
                style={{marginBottom:'-8px'}}
                />
            </div>
            <div>
                <AutoComplete
                onNewRequest={(chosenRequest)=>this.handleSheetEditors(chosenRequest)}
                floatingLabelText="Add editors"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={knownEmails}
                />
            </div>
          </div>
            <div className='new-buttons'>
                <Link to={newSheetLink} className='submit' onClick={()=>this.handleSheetsUpdate()}>
                <RaisedButton
                    label="Submit"
                    labelPosition="before"
                    containerElement="label"
                />
                </Link>
            </div>
        </div> : null;
            
        let newSheet = this.state.sheetModal?
            goToSheet:
            <Paper className="doc-box" style={{position:'relative'}} zDepth={2} rounded={false} onClick={this.handleSheet}>
                <SheetIcon style={{color:'#31884a', margin:'0px 4px 0px -2px'}} id='doc-icon'/>
                New Sheet
                <AddIcon style={{color:'#222', height:'100px',width:'100px', position:'absolute',left:'25px',top:'50px' }}/>
            </Paper>


        let findQuillId = this.props.documents.filter((e) =>{
            if(e.doctype === 'word'){
                return e
            } return null
        })
        
        let qId = findQuillId[findQuillId.length -1]
        let idQuill = qId ? qId.id : 'hahahaha'
        let newDocLink = '/quill/'+ idQuill

        // QUILL MODAL

        let goToQuill = this.state.goToDoc ? 
        <div className="pop-out">
            <p>
                New Document
            </p>
            <br/>
            
            <div className='share-dropdown-container'>
            <div>
                <TextField
                hintText="Title"
                value={this.state.docTitle}
                onChange={(event,newVal) =>{ this.setState({docTitle: newVal})}}
                style={{marginBottom:'-8px'}}
                />
            </div>
            <div>
                <AutoComplete
                onNewRequest={(chosenRequest)=>this.handleEditorsUpdate(chosenRequest)}
                floatingLabelText="Add editors"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={knownEmails}
                />
            </div>
          </div>
            <div className='new-buttons'>
                <Link to={newDocLink} className='submit' onClick={()=>this.handleDocUpdate()}>
                <RaisedButton
                    label="Submit"
                    labelPosition="before"
                    containerElement="label"
                />
                </Link>
                <Link to={newDocLink} className='skip'>
                    <RaisedButton
                        label="Skip"
                        labelPosition="before"
                        containerElement="label"
                    />
                </Link>
            </div>
        </div> : null;

        let newQuill = this.state.docModal ? 
            goToQuill:
            <Paper className="doc-box" style={{position:'relative'}} zDepth={2} rounded={false} onClick={this.handleQuill}>
                <DocIcon style={{color:'#5276d0', margin:'0px 4px 0px -2px'}} id='doc-icon'/>
                New Doc
                <AddIcon style={{color:'#222', height:'100px',width:'100px', position:'absolute',left:'25px',top:'50px' }}/>
            </Paper>

        // FILTER DOCUMENTS TO ONLY RETURN DOCS WITH LOGGED IN USER AS CREATOR OR EDITOR

        let filteredDoc = this.props.documents ? this.props.documents.filter((e) => {
            if (e.creator === this.props.userId || e.editors.split(',').includes(this.props.userId.toString()) ) {
                return e
            }
            return null

        }) : null

        // DOCUMENTS GRID

        let myDocs = filteredDoc ? filteredDoc.map((c, i) => {
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

        let loader = this.props.loading ? <div className="loader"> <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div> : myDocs

        let style = {
            height: 100,
            width: 100,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
            padding: 20
        };

        let filteredDocByType = filteredDoc ? filteredDoc.filter((e) => {
            if (e.doctype === "word" ) {
                return e
            }
            return null
        }) : null

        let wordDocs = filteredDocByType ? filteredDocByType.map((c, i) => {
            let quillLink = `/quill/${c.id}`;
            let docStyle = c.doctype === 'word' ? "2px solid #90CAF9" : "2px solid #A5D6A7"
            let wordLink = c.doctype === 'word' ?
                <Link to={quillLink}> 
                    <div className="doc-box " style={{ border: docStyle }} key={i}> 
                        <DocIcon style={{color:'#5276d0', margin:'0px 4px 0px -2px'}} id='doc-icon'/>
                        <span>{`${this.handleUppercase(c.title)} ${c.title==='untitled document'?c.id:''}`}
                        </span>
                    </div>
                </Link> :
                <h1> No Word Documents</h1>
            return (wordLink)
        }) : <h1> No Word Documents</h1>


        let filteredDocByTypeExcel = filteredDoc ? filteredDoc.filter((e) => {
            if (e.doctype === "excel") {
                return e
            }
            return null
        }) : null

        let excelDocs = filteredDocByTypeExcel ? filteredDocByTypeExcel.map((c, i) => {
            let sheetLink = `/sheets/${c.id}`;
            let docStyle = c.doctype === 'excel' ? "2px solid #A5D6A7": null
            let excelLink = c.doctype === 'excel' ?
            <Link to={sheetLink}> 
                <div className="doc-box" style={{ border: docStyle }} key={i}>
                    <SheetIcon style={{color:'#31884a', marginRight:'4px', height:'20px'}}/>  
                    <span>{`${this.handleUppercase(c.title)} ${c.title==='untitled document'?c.id:''}`}
                    </span>
                </div>
            </Link>    
            :<h1> No excel Documents</h1>
            return (excelLink)
        }) : <h1> No excel Documents</h1>
        
        console.log(this.state.docTitle)
        return (
            <MuiThemeProvider>
                
                <div>
                    <Header />
                    <div className="new-doc-box">
                        <p> New Document</p>
                        <div className="new-doc">
                           {newQuill}
                           {newSheet}
                        </div>
                    </div>
                    <Tabs>
                        <Tab label="All Documents" style={{background: '#2979FF'}}>
                            <div className="recent-doc">
                                <p>Recent Documents</p>
                                <div className='my-docs'>
                                    {loader}
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Word Documents" style={{background: '#2979FF'}}>
                            <div className="recent-doc">
                                <p> Word Documents</p>
                                <div className="my-docs">
                                    {wordDocs}
                                </div>
                            </div>
                        </Tab>
                        <Tab label="ExcelDocs" style={{background: '#2979FF'}}>
                            <div className="recent-doc">
                                <p> Excel Documents</p>
                                <div className="my-docs">
                                    {excelDocs}
                                    </div>
                            </div>
                        </Tab>
                    </Tabs>
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