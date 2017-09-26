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


class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searchTerm: ''

    };

  }

  handleToggle = (event) => this.setState({ open: !this.state.open });


  render() {
    const styler = {
      borderRadius: 50,
      height: 40,
      width: 40,
      margin: 20,
      display: 'inline-block',
    };
    console.log(this.state.searchTerm)
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
                border: ".5px solid darkblue"
              }}
             
            />
            <Paper className="prof-land" style={styler} zDepth={1} circle={true}>
          <img className="pro-pic" src={this.props.userPic} style={{width:'100%', height:'auto'}}/>
            </Paper>
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
function mapStateToProps(state){
  return{
    userPic: state.userPic
  }
}
export default connect(mapStateToProps)(Header);