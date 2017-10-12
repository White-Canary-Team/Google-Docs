import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './../../Header/Header.jsx'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import AutoComplete from 'material-ui/AutoComplete';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const style = {
    "margin-left": 12,
    "margin-right": 5
  };

class QuillHeader extends Component {
    constructor() {
        super();

        this.state = {
            fileOpen: false,
            editOpen: false,
            emailOpen: false,
            title: 'untitled document',
            shareOpen: false,
            allEditors: ['cwmurphy7@gmail.com',
            'rustonreformado@gmail.com',
            'coldfusion22@gmail.com',
            'canderson0289@gmail.com',
            'big_al_hill@comcast.net'],
            docEditors: '',
        };
        this.handleUppercase = this.handleUppercase.bind(this)
        // this.handleEditors = this.handleEditors.bind(this)
        this.handleEditorsUpdate = this.handleEditorsUpdate.bind(this)
    }
    componentDidMount(){
        this.setState({title: this.props.title})
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
    handleFileTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({fileOpen: true, anchorEl: event.currentTarget});
    };

    handleEditTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({editOpen: true, anchorEl: event.currentTarget});
    };

    handleEmailTouchTap = (event) => {
        event.preventDefault();
        this.setState({emailOpen: true, anchorEl: event.currentTarget})
    };

    handleFileRequestClose = () => {
        this.setState({fileOpen: false});
    };

    handleEditRequestClose = () => {
        this.setState({editOpen: false});
    };

    handleEmailRequestClose = () => {
        this.setState({emailOpen: false});
    }

    handleUppercase(title){
        if (this.props.title){
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
        } else return title
    }

    // handleEditors(email){
    //     // let emails = e.target.value.split(', ');
    //     // console.log(emails);
    //     // this.setState({
    //     //     sheetEditors: e.target.value
    //     // })
    //     console.log(email)
    //     let validEmail = false;
    //     let editorsCopy = this.state.docEditors.slice();
    //     for (let i=0;i<editorsCopy.length;i++){
    //         if (editorsCopy[i].email === email){
    //             // validEmail = true;
    //             // let newEditors = this.state.docEditors 
    //             let thisEditor = this.props.editors.concat(',' + editorsCopy[i].id)
    //             this.setState({docEditors:thisEditor})
    //         }
    //     }
    //     if (!validEmail)alert("Please enter a valid user email")
    // }

    handleEditorsUpdate(email){
        
        let qId = this.props.id
        let idQuill = qId ? qId : 'hahahaha'
        let existingEditors = this.props.editors
        let newId = (email === 'cwmurphy7@gmail.com'? '505' : email === 'rustonreformado@gmail.com' ? '13' : email === 'coldfusion22@gmail.com' ? '1' : email === 'canderson0289@gmail.com' ? '968' : email === 'big_al_hill@comcast.net' ? '301' : '' )
        
        let validEmail = false;
        if (!newId) alert("Please enter a valid user email")
        else {
            let newEditors = existingEditors + ',' + newId
            console.log(newEditors, idQuill, 'please include new editor')
            axios.post('/quillShare',{
                editors: newEditors,
                id: idQuill
            })
            this.setState({shareOpen:false})
        }
        
    }

    handleShareTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          shareOpen: true,
          anchorEl: event.currentTarget,
        });
      };
    render() {
        console.log(this.props, 'this is props on header')
        const knownEmails = [
            'cwmurphy7@gmail.com',
            'rustonreformado@gmail.com',
            'coldfusion22@gmail.com',
            'canderson0289@gmail.com',
            'big_al_hill@comcast.net'
        ];
        return (
            <MuiThemeProvider>

                <div className='quill-header-container'>

                    <div className='left-section-button-quill'>
                        <Link to='/home'><img className='top-left-hamburger' alt='no one' src='https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png' /></Link>
                    </div>

                    <div className='file-edit-menu-container'>
                        <h1 className='document-name'>{this.handleUppercase(this.props.title)}</h1> {/* This will be the document name from the database */}
                        <div className='file-edit'>
                            <div className='file-button'>
                                <FlatButton fullWidth={true} onClick={this.handleFileTouchTap} label="File"/>
                                <Popover
                                    open={this.state.fileOpen}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                    horizontal: 'left',
                                    vertical: 'bottom'
                                    }}
                                    targetOrigin={{
                                    horizontal: 'left',
                                    vertical: 'top'
                                    }}
                                    onRequestClose={this.handleFileRequestClose}>
                                    <Menu>
                                        <MenuItem
                                            primaryText="New"
                                            rightIcon={<ArrowDropRight />}
                                            menuItems={[ < MenuItem primaryText = "Document" />, < MenuItem primaryText = "Spreadsheet"/> ]}/>
                                        <MenuItem primaryText="Open"/>
                                        <MenuItem primaryText="Rename"/>
                                        <MenuItem primaryText="Make a copy"/>
                                        <MenuItem primaryText="Download as"/>
                                    </Menu>
                                </Popover>
                            </div>

                            <div className='edit-button'>
                                <FlatButton fullWidth={true} onClick={this.handleEditTouchTap} label="Edit"/>
                                <Popover
                                    open={this.state.editOpen}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                    horizontal: 'left',
                                    vertical: 'bottom'
                                }}
                                    targetOrigin={{
                                    horizontal: 'left',
                                    vertical: 'top'
                                }}
                                    onRequestClose={this.handleEditRequestClose}>
                                    <Menu>
                                        <MenuItem primaryText="Paste"/>
                                        <MenuItem primaryText="Select All"/>
                                        <MenuItem primaryText="Find"/>

                                    </Menu>
                                </Popover>
                            </div>
                        </div>
                    </div>

                    <div className='right-side-content'>
                        <div className='top-right-email-dropdown'>
                            <FlatButton 
                                fullWidth={true} 
                                onClick={this.handleEmailTouchTap} 
                                label={this.props.email} 
                                icon={<ArrowDropRight />}
                                labelPosition="before"
                            />
                            <Popover
                                open={this.state.emailOpen}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                onRequestClose={this.handleEmailRequestClose}
                            >
                                <Menu 
                                    style={{ width: 300, height: '10%', background: "pink" }}
                                >
                                    <div className="menu-pic-container">
                                        <img className="pro-pic-dropdown" src={this.props.userPic} style={{ width: '100', height: '100' }} />
                                        {this.props.email}
                                        <Link to="/profile"> <button>My Account</button></Link>
                                    </div>
                                    
                                    <MenuItem primaryText={this.props.email} />
                                    <MenuItem primaryText="Settings" />
                                </Menu>
                            </Popover>
                        </div>
                        
                        <div className='comment-and-share'>
                            <RaisedButton 
                                label="Comments" />
                            <RaisedButton 
                                label="Share" 
                                style={style} 
                                backgroundColor={"#2979FF"} 
                                labelColor={"white"} 
                                onClick={this.handleShareTouchTap}
                            />
                            <Popover
                                open={this.state.shareOpen}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.handleRequestClose}
                            >
                                <AutoComplete
                                    onNewRequest={(chosenRequest)=>this.handleEditorsUpdate(chosenRequest)}
                                    floatingLabelText="Add editors"
                                    filter={AutoComplete.caseInsensitiveFilter}
                                    dataSource={knownEmails}
                                />
                            </Popover>

                        </div>
                    </div>

                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    console.log("state" , state)
    return {
        email: state.email
    }
  }
  export default connect(mapStateToProps)(QuillHeader)