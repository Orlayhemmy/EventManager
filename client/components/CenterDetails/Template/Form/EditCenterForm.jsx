import React from 'react';
import UploadImage from '../../../ImageUpload/ImageUpload';

/**
 * @description EditCentere component
 */
export default class EditCenter extends React.Component {
  render() {
    const {
      centerName,
      location,
      facilities,
      description,
      capacity,
      cost,
      errors
    } = this.props.centerState;
    return (
      <div id="editCenterDetails" hidden>
        <UploadImage
          path={this.props.path}
          uploadedImage={this.props.imageUrl}
          showImage={this.props.showImage}
        />
        <div className="media-body text-center mb-4">
          <form id="edit-center-form">
            <div>
              <span className="help-block">{errors.centerName}</span>
              <input
                type="text"
                value={centerName}
                id="centerName"
                onChange={this.props.onChange}
                className="logo text-primary text-center no-border"
              />
              <border />
            </div>
            <h3 className="mt-2">location</h3>
            <div>
            <span className="help-block">{errors.location}</span>
              <input
                type="text"
                value={location}
                id="location"
                onChange={this.props.onChange}
                className="text-center no-border mt-0 "
              />
              <border />
            </div>
            <h3 className="mt-2">capacity</h3>
            <div>
            <span className="help-block">{errors.capacity}</span>
              <input
                type="text"
                value={capacity}
                id="capacity"
                onChange={this.props.onChange}
                className="text-center no-border mt-0 "
              />
              <border />
            </div>
            <h3 className="mt-2">facilities</h3>
            <p className="help-block">{errors.facilities}</p>
            <div>
              <input
                type="text"
                value={facilities}
                id="facilities"
                onChange={this.props.onChange}
                className="text-center no-border mt-0 "
              />
              <border />
            </div>
            <h3 className="mt-2">Price</h3>
            <p className="help-block">{errors.cost}</p>
            <div>
              <input
                type="text"
                value={cost}
                id="cost"
                onChange={this.props.onChange}
                className="text-center no-border mt-0 "
              />
              <border />
            </div>
            <h3 className="mt-2">description</h3>
            <p className="help-block">{errors.description}</p>
            <div>
              <textarea
                value={description}
                id="description"
                onChange={this.props.onChange}
                className="form-control col-xs-6 mb-4"
              />
            </div>
            <input
              type="button"
              data-toggle-id="editCenterDetails"
              className="btn btn-sm btn-success p-1 mr-1"
              onClick={this.props.isValid}
              value="save"
            />
            <input
              type="button"
              data-toggle-id="editCenterDetails"
              className="btn btn-sm btn-danger p-1 ml-1"
              onClick={this.props.showHiddenDiv}
              value="cancel"
            />
          </form>
        </div>
      </div>
    );
  }
}
