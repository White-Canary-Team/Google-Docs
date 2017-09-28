import React, {Component} from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './../../Header/Header.jsx'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
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
            emailOpen: false
        };
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


    render() {
        console.log(this.props);

        return (
            <MuiThemeProvider>
                
                <div className='quill-header-container'>

                    <div className='left-section-button'><img className='top-left-hamburger' alt='no one' src='https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png' /></div>

                    <div className='file-edit-menu-container'>
                        <h1 className='document-name'>Untitled document</h1>
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
                            anchorOrigin={{
                            horizontal: 'left',
                            vertical: 'bottom'
                        }}
                            targetOrigin={{
                            horizontal: 'left',
                            vertical: 'top'
                        }}
                            onRequestClose={this.handleEmailRequestClose}>
                            <Menu>
                                <MenuItem primaryText="Paste"/>
                                <MenuItem primaryText="Select All"/>
                                <MenuItem primaryText="Find"/>

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
                                labelColor={"white"} />
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