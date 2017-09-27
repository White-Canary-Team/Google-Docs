import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HotTable from 'react-handsontable';
import io from 'socket.io-client';

let socket;


class Sheets extends Component {
  constructor(){
    super();
    this.state={
      rows: 50,
      fillData:[['White', 'Canary'],['is so much','better than'], ['Black', 'Canary']],
      columns: 50,
      table: [],
      changeLog:[],
      undoLog:[],
      filled: false,
      zoom: 1.00,
      activeSelection:[null,null,null,null]
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
    this.handleRedo = this.handleRedo.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDollars = this.handleDollars.bind(this)
  }

  //On mount, take fillData info from state and put into a 50x50 matrix, then push this matrix to state as table
  componentDidMount(){
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

    socket = io('http://localhost:3001');
    socket.on('dataIn', data=>{
      this.setState({table:data});
    })
  }
  
  // When user makes a change, it is added to a change log. this.state.table is updated by HotTable (or by componentDidMount - not really sure)
  handleChange = function(changes){
    if (changes){      
      let tempChangeLog = this.state.changeLog.slice();
      tempChangeLog.push(changes[0]);
      this.setState({changeLog:tempChangeLog})

      socket.emit('dataOut', this.state.table)
    }
  }
  
  // When a user selects 'undo', the most recent change is popped off the change log and put onto an undo log.
  handleUndo(){
    if(this.state.changeLog[0]){
      let tempChangeLog = this.state.changeLog
      let lastItem = tempChangeLog.pop();
      let tempUndoLog = this.state.undoLog
      tempUndoLog.push(lastItem)
      // console.log(lastItem);
      // console.log(this.state.changeLog)
      // console.log(this.state.undoLog)
      let row = lastItem[0][0];
      let column = lastItem[0][1];
      // console.log(this.state.undoLog)
      // console.log(row)
      let tempTable = this.state.table.slice();
      tempTable[row].splice(column,1,lastItem[0][2])
      this.setState({table: tempTable})
    }
  }
  // Opposite of undo
  handleRedo(){
    if(this.state.undoLog[0]){
      let tempUndoLog = this.state.undoLog
      let nextItem = tempUndoLog.pop();
      let tempChangeLog = this.state.changeLog
      tempChangeLog.push(nextItem)
      // console.log(lastItem);
      // console.log(this.state.changeLog)
      // console.log(this.state.undoLog)
      let row = nextItem[0][0];
      let column = nextItem[0][1];
      // console.log(row, column)
      // console.log(row)
      let tempTable = this.state.table.slice();
      // console.log(nextItem)
      tempTable[row].splice(column,1,nextItem[0][3])
      this.setState({table: tempTable})
    }
  }
  // Handle undo - handsontable does not do well with zoom changes. The column headers will move weird on scroll.
  handleZoom(zoomVal){
    // console.log(zoomVal)
    this.setState({zoom:zoomVal})
  }
  // Push current selection to state so we can change properties of only these cells.
  handleSelect(rStart, cStart, rEnd, cEnd){
    this.setState({activeSelection: [rStart, cStart, rEnd, cEnd]})
  }
  // Change selected cells to dollar format (also changes from number to string)
  handleDollars(){
    let tempTable = this.state.table.slice();
    let selected = this.state.activeSelection.slice();
    if (selected[0]){
      for (let i = selected[0]; i <= selected[2]; i++){
        for (let j = selected[1]; j <= selected[3]; j++){
          let value = tempTable[i][j];
          if ((typeof value !== 'string' && typeof value !== 'number')||value.split[0]==='$'||Number(value)!=value || value === '') value = value;
          else{
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
              } else value = value;
            } else value.push('.00')
            value = '$' + value.join('');
            tempTable[i].splice(j,1,value)
          }
        }
      }
      this.setState({table:tempTable})
    }
  }


  render() {
    return (
      <div className='sheets'>
        <div className='menu-bar'>

          <div className='undo-redo'>
            <div className='undo'  onClick={()=>this.handleUndo()}>
              <i className='fa fa-undo'></i>
            </div>
            <div className='redo'  onClick={()=>this.handleRedo()}>
              <i className='fa fa-repeat'></i>
            </div>
          </div>

          <div className='zoom-select blue semi-square'>
            <select onChange={(event)=>this.handleZoom(event.target.value)} defaultValue={1.00}>
              <option value={.50}>50%</option>
              <option value={.75}>75%</option>
              <option value={.90}>90%</option>
              <option value={1.00}>100%</option>
              <option value={1.25}>125%</option>
              <option value={1.50}>150%</option>
              <option value={2.00}>200%</option>
            </select>
          </div>

          <div className='data-type-select'>
            <div className='dollars' onClick={()=>this.handleDollars()}>$</div>
            <div className='percent'>%</div>
          </div>

        </div>

        <div className="table-container" style={{MsTransform: `scale(${this.state.zoom},${this.state.zoom})`, WebkitTransform: `scale(${this.state.zoom},${this.state.zoom})`, transform: `scale(${this.state.zoom},${this.state.zoom})`, transformOrigin: '0% 0%'}}>
          <HotTable 
            className='table'
            data={this.state.table} 
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
    );
  }
}

export default Sheets;
