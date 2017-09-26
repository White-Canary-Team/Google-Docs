import React from 'react';
import HotTable from 'react-handsontable';
import Redux, { combineReducers } from 'redux'
import store from '../../utils/store.js'
import ActionList from './ActionList'

export default class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handsontableData = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2016", 10, 11, 12, 13],
      ["2017", 20, 11, 14, 13],
      ["2018", 30, 15, 12, 13]
    ];
  }

  render() {
    return (
      <div id="example-component">
        <HotTable root="hot" settings={{
            data: this.handsontableData,
            colHeaders: true,
            rowHeaders: true, 
            onAfterChange: (changes, source) => {
              if (source !== 'loadData') {
                store.dispatch({
                  id: store.getState().changes.length,
                  type: 'change',
                  row: changes[0][0],
                  column: changes[0][1],
                  oldValue: changes[0][2],
                  newValue: changes[0][3]
                });                  
              }
            }
          }}/>
        <ActionList actionList={store.getState().changes}/>
      </div>
    );
  }
}