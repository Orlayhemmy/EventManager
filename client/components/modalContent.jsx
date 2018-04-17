import React from 'react';

export default class modalContent extends React.Component {
  content() {
    const id = this.props.id;
    if (id === 'disapprove') {
      return (
        <div>
          <p> Disapproved event will be deleted. Are you sure you want to disapprove event?</p>
          <i id="disapprove" className="fa fa-trash red" onClick={this.onAttend}></i>
          <i data-toggle-id="disapprove" className="fa fa-close" onClick={this.showHiddenDiv}></i>
          <br/>
          <span><br/>delete</span>
          <span><br/>cancel</span>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
      { this.content() }
      </div>
    )
  }
} 