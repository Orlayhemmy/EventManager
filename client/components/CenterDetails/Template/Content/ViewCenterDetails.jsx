import React from 'react';

/**
 *  @description CenterDetailsContent form component
 */
export default class Details extends React.Component {
  render() {
    const {
      showHiddenDiv,
      centerState: {
        centerName,
        location,
        facilities,
        description,
        imageUrl,
        capacity,
        cost
      }
    } = this.props;
    return (
      <div id="centerDetails">
        <div className="imageUpload">
          <img className="img-fluid dropzone" src={imageUrl} />
        </div>
        <div className="media-body text-center mb-4 mt-4">
          <strong className="logo text-primary mb-2">{centerName}</strong>
          <h3 className="mt-2">location</h3>
          <p>{location}</p>
          <h3 className="mt-2">capacity</h3>
          <p>{capacity}</p>
          <h3 className="mt-2">facilities</h3>
          <p>{facilities}</p>
          <h3 className="mt-2">price</h3>
          <p>{cost}</p>
          <h3 className="mt-2">description</h3>
          <p>{description}</p>
        </div>
        ...{' '}
        <i
        id="edit-centerDetails"
          data-toggle-id="editCenterDetails"
          className="fa fa-pencil-alt main-color"
          onClick={showHiddenDiv}
        >
          edit
        </i>
      </div>
    );
  }
}
