import React from 'react';

export default class Delete extends React.Component {
  render() {
    const { title, onDelete, onCancel } = this.props;
    return (
      <div>
        <p>Are you sure you want to delete {title}?</p>
        <i className="fa fa-trash red" onClick={onDelete}/>
        <i className="fa fa-save green" onClick={onCancel}/>
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
