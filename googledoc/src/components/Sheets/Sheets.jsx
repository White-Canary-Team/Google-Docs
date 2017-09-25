import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HotTable from 'react-handsontable';


class Sheets extends Component {
  render() {
    return (
      <div>
        <HotTable 
          data={[['White', 'Canary'],['is so much','better than'] ['Black', 'Canary']]} 
          contextMenu={true} 
          colHeaders={true} 
        />
      </div>
    );
  }
}

export default Sheets;
