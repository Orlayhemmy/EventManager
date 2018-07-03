import React from 'react';

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
              <div className="imageUpload">
                <img
                  src={
                    this.props.path === '/add-center'
                      ? './images/centerholder.jpg'
                      : './images/imageholder.jpg'
                  }
                  className="img-fluid dropzone"
                />
              </div>
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
