import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import getPlugin from 'handsontable';
import HotTable, {render} from 'react-handsontable';


class Sheets extends Component {
  constructor(){
    super();
    this.state={
      rows: 50,
      columns: 50,
      table: [],
      changes:[],
    }
    this.fillTable = this.fillTable.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
  }

  fillTable = function(fillData){
    let tempTable = [];
    for (let i=0;i<this.state.rows;i++){
      let row = [];
      for (let j=0;j<this.state.columns;j++){
        row.push('')
      }
      tempTable.push(row);
    }
    
    if (fillData){
      for (let k=0;k<fillData.length;k++){
        let tempRow = []
        for (let l=0;l<fillData[k].length;l++){
          tempTable[k].splice(l,1,fillData[k][l])
        }
        
      }
    }
    return tempTable;
    this.setState({table:tempTable})
  }

  handleChange = function(e){
    
  }

  handleUndo = function(){

    // plugin.undo();
    
  }


  render() {
    return (
      <div>
        <div className='menu-bar'>
          <div className='undo-redo'>
            <div className='undo' onClick={()=>this.handleUndo()}>
              <p>undo</p>
            </div>
          </div>

        </div>
        <HotTable className='table'
          data={this.fillTable([['White', 'Canary'],['is so much','better than'], ['Black', 'Canary']])} 
          contextMenu={true} 
          colHeaders={true} 
          rowHeaders={true}
          undo={true}
          manualColumnResize={true}
          manualRowResize={true}
          ref="hot"
          
        ></HotTable>
      </div>
    );
  }
}

export default Sheets;
