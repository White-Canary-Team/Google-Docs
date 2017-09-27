import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SearchBar from 'material-ui-search-bar'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';




class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: '',
      menu1: false,
      menu2: false,
      menu3: false

    };

  }

  handleToggle = (event) => this.setState({ open: !this.state.open });
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menu1: true,
      menu2: false,
      menu3: false,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({
      menu1: false,
    });
  };
  //// Notifacation Button Menu/////////

  handleTouchTapNote = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menu1: false,
      menu3: false,
      menu2: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose2 = () => {
    this.setState({
      menu2: false,
      
    });
  };
  /////PICTURE MENU/////
  handleTouchTapPic = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menu1: false,
      menu2: false,
      menu3: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose3 = () => {
    this.setState({
      menu3: false,
    });
  };

  render() {
    let selecter = this.state.menu3 ? '3px solid CornflowerBlue' : null
    let selected = this.state.menu2 ? "gray": null
    let selected2 = this.state.menu1 ? "gray": null
    
    const styler = {
      borderRadius: 50,
      height: 40,
      width: 40,
      margin: 20,
      display: 'inline-block',
    };
    console.log(this.props.email)
    return (

      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <AppBar
            style={{ "background": "royalblue" }}
            title={<p className="appHeader">Google&nbsp;<span>Docs</span> </p>}
            onLeftIconButtonTouchTap={this.handleToggle}

            iconElementRight={<div><SearchBar
              onChange={(val) => {
                this.setState({
                  searchTerm: val
                })
              }}

              onRequestSearch={() => console.log('onRequestSearch')}

              style={{
                position: "absolute",
                width: 600,
                left: '17vw',
                background: "rgba(	245,	245,	245, .1)",
              }}

            />
              <div>
                <div className="notification">
                  <i className="fa fa-th fa-2x" aria-hidden="true" onClick={this.handleTouchTap} style={{color:selected2}}></i>
                  <Popover
                    open={this.state.menu1}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                  >
                    <Menu>
                      <MenuItem primaryText="Square Button" />
                      <MenuItem primaryText="Help &amp; feedback" />
                      <MenuItem primaryText="Settings" />
                      <MenuItem primaryText={<a href="http://localhost:3001/auth/logout">Sign out</a>} />
                    </Menu>
                  </Popover>
                  <i id="noteBut" className="fa fa-bell fa-2x" aria-hidden="true" onClick={this.handleTouchTapNote} style={ {color: selected}}></i>
                  <Popover
                    open={this.state.menu2}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose2}
                  >
                    <Menu>
                      <MenuItem primaryText="Notification Button" />
                      <MenuItem primaryText="Help &amp; feedback" />
                      <MenuItem primaryText="Settings" />
                    </Menu>
                  </Popover>
                </div>


                <Paper className="prof-land" style={styler} zDepth={1} circle={true}>
                  <img className="pro-pic" src={this.props.userPic} style={{border: selecter} } onClick={this.handleTouchTapPic} />
                </Paper>
                <Popover
                  open={this.state.menu3}
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  onRequestClose={this.handleRequestClose3}
                >
                  <Menu style={{ width: 300, height: '10%', background: "pink" }}>
                    <div className="menu-pic-container">
                      <img className="pro-pic-dropdown" src={this.props.userPic} style={{ width: '100', height: '100' }} />
                        {this.props.email}
                        <button>My Account</button>
                      </div>
                    
                    <MenuItem primaryText={this.props.email} />
                    <MenuItem primaryText="Settings" />
                  </Menu>
                </Popover>
              </div>
            </div>
            }

          />



          <Drawer containerStyle={{ height: 'calc(100% - 64px)', top: 64 }} docked={true} width={200} open={this.state.open} zDepth={2}>
            <MenuItem>Test 2</MenuItem>
            <MenuItem>Test 1</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>

    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.email,
    userPic: state.userPic
  }
}
export default connect(mapStateToProps)(Header);