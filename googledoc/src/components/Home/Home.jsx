import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd, getID, getDocs } from './../../ducks/reducer.js'
import Header from './../Header/Header.jsx'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SheetIcon from 'material-ui/svg-icons/action/view-list';
import DocIcon from 'material-ui/svg-icons/action/subject';




class Home extends Component {
    constructor() {
        super();
        this.state = {
            emails: '',
            userId: '',
            documents: [],
            userName: '',
            searchTerm: '',
            pic: '',
            refresh : true,
            sheetModal: false,
            sheetTitle: '',
            docModal: false,
            docTitle: '',
            goToDoc:true,
        }
        this.handleQuill = this.handleQuill.bind(this)
        this.handleSheet = this.handleSheet.bind(this)
        this.handleSheetTitle = this.handleSheetTitle.bind(this)
        this.handleDocTitle = this.handleDocTitle.bind(this)
        this.handleDocUpdate = this.handleDocUpdate.bind(this)
        this.handleUppercase = this .handleUppercase.bind(this)
        
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
    
    //DIFFERENT FROM ALEX'S!!!!!!!!!!!!!
    handleQuill() {
        console.log(this.props.userId)
        axios.post('/quill', {
            title: "untitled document",
            creator: this.props.userId,
            doctype: "word",
            editors: this.props.userId
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
            body: '[[placeholder]]',
            styles: '[[black]]'
        })
        this.props.getDocs()
        this.setState({
            sheetModal: true
        })
    }
    handleSheetTitle(e){
        this.setState({
            sheetTitle: e.target.value
        })
    }
    handleTitleUpdate(){
        axios.post('/jsheet-title',{
            title: this.state.sheetTitle
        })
    }

    handleDocTitle(e){
        this.setState({
            docTitle: e.target.value
        })
    }
    handleDocUpdate(){
        let findQuillId = this.props.documents.filter((e) =>{
            if(e.doctype === 'word'){
                return e
            } return null
        })
        
        let qId = findQuillId[findQuillId.length -1]
        let idQuill = qId ? qId.id : 'hahahaha'
        axios.post('/quillTitle',{
            title: this.state.docTitle,
            id: idQuill
        })
        this.setState({
            goToDoc: false
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
        console.log(this.props.documents, 'refresh')
        let findId = this.props.documents.filter((e)=>{
            if(e.doctype === 'excel'){
                return e.id
            } return null
        })
        let theId = findId[findId.length-1]
        let idDoc = theId ? theId.id + 1 : 'hahah'
        console.log(idDoc)

        let newSheetLink = '/sheets/'+ idDoc
        console.log(newSheetLink)


        // let newSheet = this.state.sheetModal ? <div className="pop-out"><h1>Title The Sheet</h1><br/><input value={this.state.sheetTitle} onChange={this.handleSheetTitle} placeholder="test"></input><Link to={newSheetLink}><button>Submit</button></Link></div>: 
        // <Paper className="doc-box" zDepth={2} rounded={false} onClick={this.handleSheet}>New Sheet</Paper>
        let newSheet = this.state.sheetModal ? <div className="pop-out"><h1>Title The Sheet</h1><br/><input value={this.state.sheetTitle} onChange={this.handleSheetTitle} placeholder="test"></input><Link to={newSheetLink}><button>Submit</button></Link></div>: 
        <Paper className="doc-box" zDepth={2} rounded={false} onClick={this.handleSheet}>New Sheet</Paper>


        console.log(this.state.sheetTitle)

        let findQuillId = this.props.documents.filter((e) =>{
            if(e.doctype === 'word'){
                return e
            } return null
        })
        
        let qId = findQuillId[findQuillId.length -1]
        let idQuill = qId ? qId.id : 'hahahaha'
        console.log(idQuill)

        let newDocLink = '/quill/'+ idQuill

        let goToQuill = this.state.goToDoc ? <div className="pop-out"><h1>Title The Sheet</h1><br/><input value={this.state.docTitle} onChange={this.handleDocTitle} placeholder="test"></input><button onClick={this.handleDocUpdate}>Submit</button></div>: <div className="pop-out"><Link to={newDocLink}><h1>HahA</h1></Link></div>
        let newQuill = this.state.docModal ? goToQuill:
        <Paper className="doc-box" zDepth={2} rounded={false} onClick={this.handleQuill}>New Quill</Paper>
        





        let filteredDoc = this.props.documents ? this.props.documents.filter((e) => {
            console.log(e.editors.split(',').includes(this.props.userId.toString()))
            console.log(this.props.userId)
            if (e.creator === this.props.userId || e.editors.split(',').includes(this.props.userId.toString()) ) {
                return e
            }
            return null

        }) : null
        console.log(filteredDoc)
        // let myDocs = filteredDoc ? filteredDoc.map((c, i) => {
        //     let quillLink = `/quill/${c.id}`;william

        //     let sheetLink = `/sheets/${c.id}`;
        //     let docStyle = c.doctype === 'word' ? "2px solid #90CAF9" : "2px solid #A5D6A7"
        //     let docLink = c.doctype === 'word' ?
        //         <Link to={quillLink}> <Paper className="doc-box" style={{ border: docStyle }} zDepth={2} key={i} rounded={false}> {c.title} {c.id}</Paper></Link> :
        //         <Link to={sheetLink}> <Paper className="doc-box" style={{ border: docStyle }} zDepth={2} key={i} rounded={false}>{c.title} {c.id}</Paper></Link>

        //     return (docLink)


        // }) : null
        let myDocs = filteredDoc ? filteredDoc.map((c, i) => {
            let quillLink = `/quill/${c.id}`;
            
            let sheetLink = `/sheets/${c.id}`;
            let docStyle = c.doctype === 'word' ? "2px solid #90CAF9" : "2px solid #A5D6A7"
            let docLink = c.doctype === 'word' ?
                <Link to={quillLink}> 
                    <div className="doc-box " style={{ border: docStyle }} key={i}> 
                        <DocIcon style={{color:'#5276d0', marginRight:'4px'}}/>
                        <span>{`${this.handleUppercase(c.title)} ${c.id}`}
                        </span>
                    </div>
                </Link> :
                <Link to={sheetLink}> 
                    <div className="doc-box" style={{ border: docStyle }} key={i}>
                        <SheetIcon style={{color:'#31884a', marginRight:'4px', height:'20px'}}/>  
                        <span>{`${this.handleUppercase(c.title)} ${c.id}`}
                        </span>
                    </div>
                </Link>

            return (docLink)


        }) : null
        let loader = this.props.loading ? <div className="loader"> <i className="fa fa-spinner fa-pulse fa-5x fa-fw"></i></div> : myDocs

        console.log(this.props.loading)
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
                <Link to={quillLink}> <Paper className="doc-box" style={{ border: docStyle, marginBottom: '30px' }} zDepth={2} key={i} rounded={false}> {c.title} {c.id}</Paper></Link> :
                <h1> No word Documents</h1>
            return (wordLink)
        }) : <h1> No word Documents</h1>


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
                <Link to={sheetLink}> <Paper className="doc-box" style={{ border: docStyle, marginBottom: '30px' }} zDepth={2} key={i} rounded={false}> {c.title} {c.id}</Paper></Link> :null
            return (excelLink)
        }) : <h1> No excel Documents</h1>
        console.log(filteredDocByTypeExcel)

        console.log(this.props.userId, 'should be Charlie')

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