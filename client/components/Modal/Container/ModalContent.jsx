import React from 'react';

/**
 * @description modalContent component
 */
export default class modalContent extends React.Component {
  content() {
    const { id } = this.props;
    if (id === 'disapprove') {
      return (
        <div>
          <p>
            {' '}
            Disapproved event will be deleted. Are you sure you want to
            disapprove event?
          </p>
          <i
            id="disapprove"
            className="fa fa-trash red"
            onClick={this.onApprove}
          />
          <i
            data-toggle-id="disapprove"
            className="fa fa-close"
            onClick={this.showHiddenDiv}
          />
          <br />
          <span>
            <br />delete
          </span>
          <span>
            <br />cancel
          </span>
        </div>
      );
    }
  }
  /**
   * @memberof modalContent
   * @method render
   * @description it renders the component
   * @returns the HTML of modalContent
   */
  render() {
    return <div>{this.content()}</div>;
  }
}
