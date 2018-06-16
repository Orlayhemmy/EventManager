import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * @description imageUpload component
 */
export default class ImageUpload extends React.Component {
 /**
   * @memberof imageUpload
   * @method render
   * @description it renders the component
   * @returns the HTML of imageUpload
   */
  render() {
    return (
        <div>
          {this.props.uploadedImage === '' || !this.props.uploadedImage ? (
            <div className="imageUpload">
              <label for="imageInput">
                <p className="img-fluid dropzone p-5">
                  Click here to upload your image{' '}
                </p>
              </label>
              <input
                type="file"
                id="imageInput"
                onChange={this.props.showImage}
              />
            </div>
          ) : (
            <div className="imageUpload">
              <label for="imageInput">
                <img
                  src={this.props.uploadedImage}
                  className="img-fluid dropzone"
                />
              </label>
              <input
                type="file"
                id="imageInput"
                onChange={this.props.showImage}
              />
            </div>
          )}
        </div>
    );
  }
}

