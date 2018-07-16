/* eslint-disable */

import React from 'react';
import UploadImage from '../../../ImageUpload/ImageUpload';
import TextField from '../../../../common/textField3';

export default class ProfileForm extends React.Component {
  render() {
    const {
      fullname,
      email,
      retypePass,
      newPassword,
      oldPassword,
      errors,
      imageUrl,
      image
    } = this.props.profileState;

    const passwordForm = (
      <div id="passwordUpdate" hidden>
        <span className="help-block">{this.props.passwordError}</span>
        <br />
        <span className="subtitle">Password</span>
        <div className="form-check-inline">
          <div class="col-12 no-padding">
            <input
              id="oldPassword"
              value={oldPassword}
              placeholder="Type old password"
              type="password"
              error=""
              onChange={this.props.onChange}
            />
            <border />
          </div>
        </div>
        <br />
        <br />
        <input
        id="check-password"
          type="button"
          className="btn btn-sm btn-success mt-4"
          value="check"
          onClick={this.props.checkPassword}
        />
        <input
          type="button"
          className="btn btn-sm btn-danger mt-4"
          value="cancel"
          onClick={this.props.showDiv}
        />
      </div>
    );
    const newPasswordForm = (
      <div id="newPasswordDiv" hidden>
        <span className="help-block">{this.props.newPasswordError}</span>
        <span className="subtitle">New password</span>
        <div className="form-check-inline">
          <div class="col-12 no-padding">
            <input
              id="newPassword"
              value={newPassword}
              placeholder="New Password"
              type="password"
              error={errors.newPassword}
              onChange={this.props.onChange}
            />
            <border />
          </div>
        </div>
        <span className="subtitle">Retype password</span>
        <div className="form-check-inline">
          <div class="col-12 no-padding">
            <input
              id="retypePass"
              value={retypePass}
              placeholder="Retype Password"
              type="password"
              error={errors.retypePass}
              onChange={this.props.onChange}
            />
            <border />
          </div>
        </div>
      </div>
    );
    return (
      <form id="editDetails" hidden>
        <UploadImage
          uploadedImage={image || imageUrl}
          showImage={this.props.showImage}
        />

        <TextField
          id="fullname"
          value={fullname.toUpperCase()}
          placeholder="Fullname"
          type="text"
          error={errors.fullname}
          onChange={this.props.onChange}
          className="no-border pt-1"
        />

        <TextField
          id="profile-email"
          value={email}
          placeholder="Email Address"
          type="email"
          error={errors.email}
          onChange={this.props.onChange}
        />
        <border />

        <span
          className="subtitle"
          id="changePassword"
          onClick={this.props.showDiv}
        >
          Click here to change your password
        </span>
        {passwordForm}
        {newPasswordForm}
        <div id="submitButton">
          <input
            id="updateDetails"
            onClick={this.props.onSubmit}
            type="button"
            value="submit"
            className="btn btn-sm btn-success mt-4"
          />
          <input
            id="hide-form"
            onClick={this.props.showDiv}
            type="button"
            value="cancel"
            className="btn btn-sm btn-danger mt-4"
          />
        </div>
      </form>
    );
  }
}
