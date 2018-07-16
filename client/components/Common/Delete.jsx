import React from 'react';

/**
 * @description Delete component
 */
export default class Delete extends React.Component {
  render() {
    const { title, onDelete, onCancel } = this.props;
    return (
      <div id="delete-content">
        <p>Are you sure you want to delete {title}?</p>
        <i id="yes" className="fa fa-trash red" onClick={onDelete}/>
        <i id="no" className="fa fa-save green" onClick={onCancel}/>
        <br/>
        <span>
          <br />Yes
        </span>
        <span>
          <br />No
        </span>
      </div>
    );
  }
}
