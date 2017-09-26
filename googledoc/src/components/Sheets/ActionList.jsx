import React from 'react';
export default class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let result = null;

    if (this.props.actionList.length === 0) {
      result = <div className="empty">
          Empty. Make some changes to the table on the left!
        </div>

    } else {
      result = this.props.actionList.map(function(action) {
        return <li key={action.id} className={action.type}>Value changed at <i>({action.row}, {action.column}) </i> 
          from <strong>"{action.oldValue}"</strong> to <strong>"{action.newValue}"</strong></li>
      })
    }
    return (
      <div id="action-list">
        <h4>Change log:</h4>
        <ul>
          {result}
        </ul>
      </div>
    );
  }
}