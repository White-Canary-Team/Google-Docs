import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getPlugin from 'handsontable';
import HotTable, {render} from 'react-handsontable';


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
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
    this.handleRedo = this.handleRedo.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
  }
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
        let tempRow = []
        for (let l=0;l<fillData[k].length;l++){
          tempTable[k].splice(l,1,fillData[k][l])
        }
        
      }
    }
    this.setState({table:tempTable});
  }
  

  handleChange = function(changes){
    if (changes){      
      let tempChangeLog = this.state.changeLog.slice();
      tempChangeLog.push(changes)
      // console.log(`Temp: ${tempChangeLog}`)
      this.setState({changeLog:tempChangeLog})
      // console.log(`Change Log: ${this.state.changeLog}`)
    }
  }
  

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
      console.log(this.state.undoLog)
      // console.log(row)
      let tempTable = this.state.table.slice();
      tempTable[row].splice(column,1,lastItem[0][2])
      this.setState({table: tempTable})
    }
  }
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
      console.log(nextItem)
      tempTable[row].splice(column,1,nextItem[0][3])
      this.setState({table: tempTable})
    }
  }
  handleZoom(zoomVal){
    console.log(zoomVal)
    this.setState({zoom:zoomVal})
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
          {/* <div className='vertical-line'></div> */}
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
            <div className='dollars'>$</div>
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

            
          ></HotTable>
        </div>
      </div>
    );
  }
}

export default Sheets;
