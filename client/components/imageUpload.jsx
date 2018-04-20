import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/centerActions';
import { uploadUserImage } from '../actions/signInActions';

@connect((store) => {
  return {
    center: store.center.center,
    auth: store.auth,
  }
})

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedImage: ''
    };
  }

  sendFile(e) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "u8asaoka");
    if (this.props.path === '/profile') {
      this.props.dispatch(uploadUserImage(this.props.auth.user.id, formData))
    } else {
      this.props.dispatch(uploadImage(formData));
    }
  }
  
    render() {
      return (
        <div>
          <div>
            {this.props.uploadedImage == undefined ? 
            <div className="imageUpload">
              <label for="imageInput">
                <p className="img-fluid dropzone p-5">Click here to upload your image </p>
              </label>
            <input type="file" id="imageInput" onChange={this.sendFile.bind(this)}/>
          </div> :
            <div className="imageUpload">
              <label for="imageInput">
                <img src={this.props.uploadedImage} className="img-fluid dropzone"/>  
              </label>
              <input type="file" id="imageInput" onChange={this.sendFile.bind(this)}/>
            </div>}
          </div>
        </div>
      )
      
    }
  }