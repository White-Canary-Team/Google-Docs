import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HotTable from 'react-handsontable';
import io from 'socket.io-client';
import SheetsHeader from './SheetsHeader/SheetsHeader.jsx';
import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FormatColorText from 'material-ui/svg-icons/editor/format-color-text';
import FormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';
import Undo from 'material-ui/svg-icons/content/undo';
import Redo from 'material-ui/svg-icons/content/redo';
import FormatBold from 'material-ui/svg-icons/editor/format-bold';
import FormatItalic from 'material-ui/svg-icons/editor/format-italic';
import FormatStrikethrough from 'material-ui/svg-icons/editor/format-strikethrough';
import axios from 'axios'
// import fontColorText from 'material-design-icons/icons/editor/alarm';

let socket;


class Sheets extends Component {
  constructor(){
    super();
    this.state={
      rows: 35,
      fillData:[['White', 'Canary'],['is so much','better than'], ['Black', 'Canary']],
      // fillStyles:[[{bg:' bg-blue',color:'white'}, {bg:'bg-gray',color:'yellow'}]],
      columns: 30,
      table: [],
      styles: [],
      changeLog:[],
      undoLog:[],
      filled: false,
      zoom: 1.00,
      activeSelection:[null,null,null,null],
      latestColor: 'black',
      latestBg: 'bg-white',
      latestFont: 'arial',
      latestFs: 'ten-point',
      latestBold: '',
      latestItalic: '',
      latestStrike: '',
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
    this.handleRedo = this.handleRedo.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDataType = this.handleDataType.bind(this)
    this.getStyles = this.getStyles.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleBgChange = this.handleBgChange.bind(this)
    this.handleFontChange = this.handleFontChange.bind(this)
    this.handleFsChange = this.handleFsChange.bind(this)
    this.handleBold = this.handleBold.bind(this)
    this.handleItalic = this.handleItalic.bind(this)
    this.handleStrike = this.handleStrike.bind(this)
  }

  //On mount, take fillData info from state and put into a 50x50 matrix, then push this matrix to state as table
  componentDidMount(){
    axios.get(`/getSheetById/${this.props.match.params.id}`).then( response =>{
      console.log(JSON.parse(response.data["0"].styles))


      this.setState({ table: JSON.parse(response.data['0'].body), styles: JSON.parse(response.data["0"].styles) })
    })

    let tempTable = [];
    for (let i=0;i<this.state.rows;i++){
      let row = [];
      for (let j=0;j<this.state.columns;j++){
        row.push('')
      }
      tempTable.push(row);
    }
    
    if (this.state.fillData){
      let fillData=this.state.fillData
      for (let k=0;k<fillData.length;k++){
        for (let l=0;l<fillData[k].length;l++){
          tempTable[k].splice(l,1,fillData[k][l])
        }
        
      }
    }
    this.setState({table:tempTable});

    let tempStyles = [];
    for (let i=0;i<this.state.rows;i++){
      let row = [];
      for (let j=0;j<this.state.columns;j++){
        row.push({bg:this.state.latestBg,color:this.state.latestColor,font:this.state.latestFont, fs: this.state.latestFs, bold:this.state.latestBold, italic:this.state.latestItalic, strike:this.state.latestSrike})
      }
      tempStyles.push(row);
    }
    
    if (this.state.fillStyles){
      let fillStyles=this.state.fillStyles
      for (let k=0;k<fillStyles.length;k++){
        for (let l=0;l<fillStyles[k].length;l++){
          tempStyles[k].splice(l,1,fillStyles[k][l])
        }
        
      }
    }
    this.setState({styles:tempStyles})
    socket = io('http://localhost:3001');


    socket.emit('room', { id: this.props.match.params.id})
    socket.on('dataIn', data=>{
      console.log(data, 'fornt end sould be new data')
      this.setState({table:data.table, styles:data.styles});
    })
  }


  componentWillUnmount(){
        socket.emit('leave room', this.props.match.params.id);
    }
  
  // When user makes a change, it is added to a change log. this.state.table is updated by HotTable (or by componentDidMount - not really sure)
  handleChange = function(changes){
    if (changes){      
      let tempChangeLog = this.state.changeLog.slice();
      tempChangeLog.push(changes[0]);
      // console.log(tempChangeLog)
      this.setState({changeLog:tempChangeLog})

      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})
    }
  }
  
  // When a user selects 'undo', the most recent change is popped off the change log and put onto an undo log.
  handleUndo(){
    if(this.state.changeLog[0]){
      let tempChangeLog = this.state.changeLog.slice();
      let lastItem = tempChangeLog.pop();
      
      let tempUndoLog = this.state.undoLog.slice();
      tempUndoLog.push(lastItem);
      let row = lastItem[0];
      let column = lastItem[1];
      let tempTable = this.state.table.slice();
      // console.log(row, tempTable)
      tempTable[row].splice(column,1,lastItem[0][2]);
      this.setState({table: tempTable, undoLog: tempUndoLog, changeLog:tempChangeLog});
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})


      
    }
  }
  // Opposite of undo
  handleRedo(){
    if(this.state.undoLog[0]){
      let tempUndoLog = this.state.undoLog.slice();
      let nextItem = tempUndoLog.pop();
      let tempChangeLog = this.state.changeLog.slice();
      console.log(nextItem)
      tempChangeLog.push(nextItem)
      let row = nextItem[0];
      let column = nextItem[1];
      let tempTable = this.state.table.slice();
      tempTable[row].splice(column,1,nextItem[3])
      this.setState({table: tempTable, changeLog:tempChangeLog, undoLog:tempUndoLog})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

      
    }
  }
  // Handle undo - handsontable does not do well with zoom changes. The column headers will move weird on scroll.
  handleZoom(event, index, zoomVal){
    this.setState({zoom:zoomVal})
  }
  // Push current selection to state so we can change properties of only these cells.
  handleSelect(rStart, cStart, rEnd, cEnd){
    if (rStart > rEnd) {
      let temp = rStart;
      rStart = rEnd;
      rEnd = temp;
    }
    if (cStart > cEnd) {
      let temp = cStart;
      cStart = cEnd;
      cEnd = temp;
    }
    this.setState({activeSelection: [rStart, cStart, rEnd, cEnd]})
    let allBold='bold';
    let allItalic='italic';
    let allStrike='strike';
    let allSameColor = this.state.styles[rStart][cStart].color;
    let allSameBg = this.state.styles[rStart][cStart].bg;
    let allSameFs = this.state.styles[rStart][cStart].fs;
    let allSameFont = this.state.styles[rStart][cStart].font;
    console.log(allSameColor) 
    for (let i=rStart;i<=rEnd;i++){
      for (let j=cStart;j<=cEnd;j++){
        if (this.state.styles[i][j].bold !== 'bold') allBold = ''
        if (this.state.styles[i][j].italic !== 'italic') allItalic = ''
        if (this.state.styles[i][j].strike !== 'strike') allStrike = ''
        if (this.state.styles[i][j].color !== allSameColor) allSameColor = 'black'
        if (this.state.styles[i][j].bg !== allSameBg) allSameBg = 'bg-white'
        if (this.state.styles[i][j].fs !== allSameFs) allSameFs = 'ten-point'
        if (this.state.styles[i][j].font !== allSameFont) allSameFont = 'arial'
       
      }
    }
    this.setState({latestBold:allBold, latestItalic:allItalic, latestStrike: allStrike, latestColor:allSameColor, latestBg:allSameBg, latestFs:allSameFs, latestFont:allSameFont})

  }
  // Change selected cells to dollar format (also changes from number to string)
  handleDataType(type){
    let tempTable = this.state.table.slice();
    let selected = this.state.activeSelection.slice();
    if (selected[0]){
      for (let i = selected[0]; i <= selected[2]; i++){
        for (let j = selected[1]; j <= selected[3]; j++){
          let value = tempTable[i][j];
          let valLength = value.split('').length;
          if (value.split('')[0]==='$'){
            value = value.split('');
            value.shift();
            value = value.join('');
          } else if (value.split('')[valLength - 1] === '%'){
            value = value.split('')
            value.pop()
            value = value.join('');
            value = Number(value)/100;
          }
          if ((typeof value === 'string' || typeof value === 'number') && Number(value)==value && value !== ''){ 
            value = (type === 'percent' ? Number(value)*100 : value);
            value = value.toString().split('');
            
            if (value.indexOf('.') !== -1 && value.indexOf('.') == value.lastIndexOf('.')){

              let decimals = value.length - 1 - value.lastIndexOf('.');
              if (decimals < 2){
                for(let k=0;k<decimals;k++){
                  value.push('0')
                }
              } else if (decimals > 2){
                for ( let l=decimals;l>2; l--){
                  value.pop()
                }
              }
            } else value.push('.00')
            value = (type === 'dollars' ? '$' + value.join('') : type === 'percent' ? value.join('') + '%' : value);
            tempTable[i].splice(j,1,value)
          }
        }
      }
      this.setState({table:tempTable})
    }
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

  }
  handleColorChange(event,value){
    let selected = this.state.activeSelection.slice();
    if (selected[0] || selected[0] === 0){
      let tempStyles = this.state.styles.slice();
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let bg = tempStyles[i][j].bg
          let font = tempStyles[i][j].font
          let fs = tempStyles[i][j].fs
          let bold = tempStyles[i][j].bold
          let italic = tempStyles[i][j].italic
          let strike = tempStyles[i][j].strike
          tempStyles[i].splice(j,1,{bg:bg,font:font,fs:fs,color:value,})
        }
      }
      this.setState({styles: tempStyles, latestColor: value})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

    }
  }
  handleBgChange(event, value){
    let selected = this.state.activeSelection.slice();
    // console.log(selected,value)
    if (selected[0] || selected[0] === 0){
      let tempStyles = this.state.styles.slice();
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let color = tempStyles[i][j].color
          let font = tempStyles[i][j].font
          let fs = tempStyles[i][j].fs
          let bold = tempStyles[i][j].bold
          let italic = tempStyles[i][j].italic
          let strike = tempStyles[i][j].strike
          tempStyles[i].splice(j,1,{color:color,font:font,fs:fs,bg:value,bold:bold,italic:italic,strike:strike})
        }
      }
      this.setState({styles: tempStyles, latestBg:value})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

      console.log(this.state.latestBg)
    }
    
  }
  handleFontChange(event,key,value){
    let selected = this.state.activeSelection.slice();
    if (selected[0] || selected[0] === 0){
      let tempStyles = this.state.styles.slice();
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let color = tempStyles[i][j].color;
          let bg = tempStyles[i][j].bg;
          let fs = tempStyles[i][j].fs
          let bold = tempStyles[i][j].bold
          let italic = tempStyles[i][j].italic
          let strike = tempStyles[i][j].strike
          tempStyles[i].splice(j,1,{color:color,bg:bg,fs:fs,font:value,bold:bold,italic:italic,strike:strike})
        }
      }
      this.setState({styles: tempStyles, latestFont:value})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

    } else this.setState({latestFont: value})
    
  }
  handleFsChange(event,key,value){
    let selected = this.state.activeSelection.slice();
    if (selected[0] || selected[0] === 0){
      let tempStyles = this.state.styles.slice();
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let color = tempStyles[i][j].color;
          let bg = tempStyles[i][j].bg;
          let font = tempStyles[i][j].font
          let bold = tempStyles[i][j].bold
          let italic = tempStyles[i][j].italic
          let strike = tempStyles[i][j].strike
          tempStyles[i].splice(j,1,{color:color,bg:bg,font:font,fs:value,bold:bold,italic:italic,strike:strike})
        }
      }
      this.setState({styles: tempStyles, latestFs:value})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

    } else this.setState({latestFs: value})
    
  }
  handleBold(){
    let selected = this.state.activeSelection.slice();
    let newBold = this.state.latestBold ? '' : 'bold';
    if (selected[0] || selected[0] === 0){
      let tempStyles = this.state.styles.slice();
      let allBold = true;
      
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let color = tempStyles[i][j].color;
          let bg = tempStyles[i][j].bg;
          let font = tempStyles[i][j].font
          let fs = tempStyles[i][j].fs
          let italic = tempStyles[i][j].italic
          let strike = tempStyles[i][j].strike
          // let newBold = (this.state.latestBold === true ? false : true)
          tempStyles[i].splice(j,1,{color:color,bg:bg,font:font,fs:fs,bold:newBold,italic:italic,strike:strike})
        }
      }
      this.setState({styles: tempStyles, latestBold:newBold})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

    } else this.setState({latestBold: newBold})
    
  }
  handleItalic(){
    let selected = this.state.activeSelection.slice();
    let newItalic = (this.state.latestItalic ? '' : 'italic')
    if (selected[0] || selected[0] === 0){
      let tempStyles = this.state.styles.slice();
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let color = tempStyles[i][j].color;
          let bg = tempStyles[i][j].bg;
          let font = tempStyles[i][j].font
          let fs = tempStyles[i][j].fs
          let bold = tempStyles[i][j].bold
          let strike = tempStyles[i][j].strike
          
          tempStyles[i].splice(j,1,{color:color,bg:bg,font:font,fs:fs,bold:bold,italic:newItalic,strike:strike})
        }
      }
      this.setState({styles: tempStyles, latestItalic:newItalic})
    } else this.setState({latestItalic: newItalic})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

    
  }
  handleStrike(){
    let selected = this.state.activeSelection.slice();
    let newStrike = (this.state.latestStrike? '' : 'strike')
    if (selected[0] ){
      let tempStyles = this.state.styles.slice();
      for (let i=selected[0];i<=selected[2];i++){
        for (let j=selected[1];j<=selected[3];j++){
          let color = tempStyles[i][j].color;
          let bg = tempStyles[i][j].bg;
          let font = tempStyles[i][j].font
          let fs = tempStyles[i][j].fs
          let bold = tempStyles[i][j].bold
          let italic = tempStyles[i][j].italic
          
          tempStyles[i].splice(j,1,{color:color,bg:bg,font:font,fs:fs,bold:bold,italic:italic,strike:newStrike})  
        }
      }
      this.setState({styles: tempStyles, latestStrike:newStrike})
    } else this.setState({latestStrike: newStrike})
      socket.emit('dataOut', {table: this.state.table, id: this.props.match.params.id, styles: this.state.styles})
      axios.put('/save-sheet', {table: this.state.table, styles: this.state.styles, id: this.props.match.params.id})

    
  }
  getStyles(row,col){
    let bg = this.state.styles[row][col].bg;
    let color = this.state.styles[row][col].color;
    let font = this.state.styles[row][col].font;
    let fs = this.state.styles[row][col].fs;
    let bold = this.state.styles[row][col].bold;
    let italic = this.state.styles[row][col].italic;
    let strike = this.state.styles[row][col].strike;
    return (bg + ' ' + color + ' ' + font + ' ' + fs + ' ' + bold + ' ' + italic + ' ' + strike );
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className='sheets'>
        <SheetsHeader />
        <div className='menu-bar'>

          <div className='undo-redo'>
            <div className='undo'  onClick={()=>this.handleUndo()}>
              <Undo style={{color: 'gray', fs: '4px'}}/>
            </div>
            <div className='redo'  onClick={()=>this.handleRedo()}>
              <Redo style={{color: 'gray', fs: '4px'}}/>
            </div>
          </div>
          <div className='zoom-select-container'>
            <DropDownMenu value={this.state.zoom} onChange={this.handleZoom} className='zoom-select' anchorOrigin={{ vertical:'bottom', horizontal: 'left'}} selectedMenuItemStyle={{color:'gray'}} iconStyle={{fill: '#3b3b3b', marginTop: '-4px', marginRight: '-15px'}} style={{width:'80px', marginLeft:'-9px'}} menuItemStyle={{width:'60px'}} labelStyle={{marginLeft:'0px', height:'36px'}} autoWidth={false}>
              <MenuItem value={.50} primaryText="50%" />
              <MenuItem value={.75} primaryText="75%" />
              <MenuItem value={.90} primaryText="90%" />
              <MenuItem value={1.00} primaryText="100%" />
              <MenuItem value={1.25} primaryText="125%" />
              <MenuItem value={1.5} primaryText="150%" />
              <MenuItem value={2.00} primaryText="200%" />
            </DropDownMenu>
          </div>
          

          <div className='data-type-select'>
            <div className='dollars' onClick={()=>this.handleDataType('dollars')}>$</div>
            <div className='percent'onClick={()=>this.handleDataType('percent')}>%</div>
            {/* <div className='less'onClick={()=>this.handleDataType('less')}>{'.0<'}</div>
            <div className='more'onClick={()=>this.handleDataType('more')}>{'.0>'}</div>  */}
          </div>
         

          <div className='font-select-container'>
            <DropDownMenu value={this.state.latestFont} className='font-select' onChange={this.handleFontChange} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} selectedMenuItemStyle={{fontFamily:this.state.latestFont, color:'gray'}} iconStyle={{fill:'#3b3b3b', marginTop:'-4px', marginRight:'-15px'}} style={{width:'100px', marginLeft:'-9px'}} menuItemStyle={{width:'100px', marginLeft:'-20px'}} labelStyle={{height:'36px'}} autoWidth={false}>
              {/* iconStyle={{fill: '#3b3b3b'}} */}
              <MenuItem value={'arial'} primaryText="Arial" style={{fontFamily: 'Arial'}}/>  
              <MenuItem value={'open-sans'} primaryText="Open Sans" style={{fontFamily: 'Open Sans'}}/>
              <MenuItem value={'roboto'} primaryText="Roboto" style={{fontFamily: 'Roboto'}}/>
              <MenuItem value={'verdana'} primaryText="Verdana" style={{fontFamily: 'Verdana'}}/>
            </DropDownMenu>
          </div>
          <div className='font-size-select-container'>
            <DropDownMenu value={this.state.latestFs} className='font-size-select' onChange={this.handleFsChange} anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} selectedMenuItemStyle={{color:'gray'}}  iconStyle={{fill:'#3b3b3b', marginTop:'-4px', marginRight:'-15px'}} style={{width:'80px', marginLeft:'0px'}} labelStyle={{height:'36px', width:'64px'}} autoWidth={false}>
              <MenuItem value={'eight-point'} primaryText="8" />  
              <MenuItem value={'ten-point'} primaryText="10" />
              <MenuItem value={'twelve-point'} primaryText="12" />
            </DropDownMenu>
          </div>
          <div className='font-style'>
            <div className={`bold-select ${this.state.latestBold ? 'selected' : 'deselected'}`} onClick={this.handleBold}>
              <FormatBold/>
            </div>
            <div className={`italic-select ${this.state.latestItalic ? 'selected' : 'deselected'}`} onClick={this.handleItalic}>
              <FormatItalic/>
            </div>
            <div className={`strike-select ${this.state.latestStrike ? 'selected' : 'deselected'}`} onClick={this.handleStrike}>
              <FormatStrikethrough/>
            </div>



            <div className='color-select'>

              <IconMenu
                iconButtonElement={<IconButton><FormatColorText /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                value={this.state.latestColor}
                onChange={this.handleColorChange}
                iconStyle={{color:this.state.latestColor}}
                selectedMenuItemStyle={{backgroundColor:'#f5f5f5', color:this.state.latestColor}}
              >
                <MenuItem value={'black'} primaryText="black" style={ {color: 'black'}} />
                <MenuItem value={'red'} primaryText="red" style={ {color: 'red'}}/>
                <MenuItem value={'orange'} primaryText="orange" style={ {color: 'orange'}}/>
                <MenuItem value={'yellow'} primaryText="yellow" style={ {color: 'yellow'}}/>
                <MenuItem value={'lime'} primaryText="green" style={ {color: '#51ff3f'}}/>
                <MenuItem value={'cyan'} primaryText="cyan" style={ {color: 'cyan'}}/>
                <MenuItem value={'cornflowerblue'} primaryText="cornflowerblue" style={ {color: 'cornflowerblue'}}/>
                <MenuItem value={'blue'} primaryText="blue" style={ {color: 'blue'}}/>
                <MenuItem value={'purple'} primaryText="purple" style={ {color: 'purple'}}/>
                <MenuItem value={'magenta'} primaryText="magenta" style={ {color: 'magenta'}}/>
                <MenuItem value={'white'} primaryText="white" style={ {color: 'gray'}}/>
              </IconMenu>

            </div> 
          </div> 

          <div className={`bg-select ${this.state.latestBg}`} style={{backgroundColor:this.state.latestBg}}>
            <IconMenu
              iconButtonElement={<IconButton><FormatColorFill /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              value={this.state.latestBg}
              onChange={this.handleBgChange}
              iconStyle={{backgroundColor:this.state.latestBg}}
              selectedMenuItemStyle={{ color:'lightgray'}}
            >
              <MenuItem value={'bg-white'} primaryText="white" style={ {backgroundColor: 'white', color: 'black'}}/>
              <MenuItem value={'bg-red'} primaryText="red" style={ {backgroundColor: 'red', color: 'white'}}/>
              <MenuItem value={'bg-orange'} primaryText="orange" style={ {backgroundColor: 'orange', color: 'white'}}/>
              <MenuItem value={'bg-yellow'} primaryText="yellow" style={ {backgroundColor: 'yellow', color: 'black'}}/>
              <MenuItem value={'bg-lime'} primaryText="green" style={ {backgroundColor: 'lime', color: 'white'}}/>
              <MenuItem value={'bg-cyan'} primaryText="cyan" style={ {backgroundColor: 'cyan', color: 'white'}}/>
              <MenuItem value={'bg-cornflowerblue'} primaryText="cornflowerblue" style={ {backgroundColor: 'cornflowerblue', color: 'white'}}/>
              <MenuItem value={'bg-blue'} primaryText="blue" style={ {backgroundColor: 'blue', color: 'white'}}/>
              <MenuItem value={'bg-purple'} primaryText="purple" style={ {backgroundColor: 'purple', color: 'white'}}/>
              <MenuItem value={'bg-magenta'} primaryText="magenta" style={ {backgroundColor: 'magenta', color: 'white'}}/>
              <MenuItem value={'bg-black'} primaryText="black" style={ {backgroundColor: 'black', color: 'white'}} />
            </IconMenu>
          </div>
          
          

        </div>

        <div className="table-container" style={{MsTransform: `scale(${this.state.zoom},${this.state.zoom})`, WebkitTransform: `scale(${this.state.zoom},${this.state.zoom})`, transform: `scale(${this.state.zoom},${this.state.zoom})`, transformOrigin: '0% 0%'}}>
          <HotTable 
            className='table'
            data={this.state.table} 
            cells={(row,col,prop)=>{
              const cellProperties = {};
              cellProperties.className = this.getStyles(row,col);
              return cellProperties;
            }}
            contextMenu={true} 
            colHeaders={true} 
            rowHeaders={true}
            undo={true}
            manualColumnResize={true}
            manualRowResize={true}
            onAfterChange={ (changes) => {this.handleChange(changes)}}
            onAfterSelectionEnd={ (rStart, cStart, rEnd, cEnd) =>{this.handleSelect(rStart, cStart, rEnd, cEnd)}}
            // onAfterDeselect={()=>{this.handleSelect(null,null,null,null)}} 
            
          ></HotTable>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Sheets;
