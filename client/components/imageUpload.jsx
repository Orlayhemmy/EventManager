import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/centerActions';
import { uploadUserImage } from '../actions/signInActions';

/**
 * @description imageUpload component
 */
export class ImageUpload extends React.Component {
   /**
   * @memberof imageUpload
   * @description it creates an instance of imageUpload
   */
  constructor(props) {
    super(props);

    this.state = {
      uploadedImage: ''
    };
  }
/**
   * @memberof imageUpload
   * @method sendFile
   * @description it calls an action
   * @param {object} event
   */
  sendFile(e) {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'u8asaoka');
    if (this.props.path === '/profile') {
      this.props.uploadUserImage(this.props.auth.user.id, formData);
    } else {
      this.props.uploadImage(formData);
    }
  }
 /**
   * @memberof imageUpload
   * @method render
   * @description it renders the component
   * @returns the HTML of imageUpload
   */
  render() {
    return (
      <div>
        <div>
          {this.props.uploadedImage == undefined ? (
            <div className="imageUpload">
              <label for="imageInput">
                <p className="img-fluid dropzone p-5">
                  Click here to upload your image{' '}
                </p>
              </label>
              <input
                type="file"
                id="imageInput"
                onChange={this.sendFile.bind(this)}
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
                onChange={this.sendFile.bind(this)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const propTypes = {
  uploadImage: PropTypes.func.isRequired,
  uploadUserImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  center: state.center,
  auth: state.auth
});
ImageUpload.propTypes = propTypes;

export default connect(mapStateToProps, {
  uploadUserImage,
  uploadImage
})(ImageUpload);
