import React,{ Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem'; 
function handleTouchTap() {
    alert('onClick triggered on the title component');
  }

class Header extends Component{

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = (event) => this.setState({open: !this.state.open});


    render(){
        return(
            
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div>
    <AppBar 
    title="Title"
    onLeftIconButtonTouchTap={this.handleToggle}
    />
    
    <Drawer containerStyle={{height: 'calc(100% - 64px)', top: 64}} docked={true} width={200} open={this.state.open} zDepth={2}>
              <MenuItem>Test 2</MenuItem>
              <MenuItem>Test 1</MenuItem>
            </Drawer>
            </div>
    </MuiThemeProvider>
 
);
}
}
export default Header;