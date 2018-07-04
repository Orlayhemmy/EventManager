import React from 'react';
import TextField from '../../../../common/textField3';

export default class NewPassword extends React.Component {
  render() {
    const {
      heading,
      formState: { errors, newPassword, retypePass },
      onChange,
      onSubmit
    } = this.props;
    return (
      <div id="newPassword" hidden>
        <form>
          {heading}
          <br />
          <span className="help-block">{errors.retypePass}</span>
          <TextField
            id="newPassword"
            value={newPassword}
            placeholder="Password"
            type="text"
            onChange={onChange}
            errors={errors.password}
          />
          <TextField
            id="retypePass"
            value={retypePass}
            placeholder="Type password again"
            type="text"
            onChange={onChange}
            errors={errors.retypePass}
          />
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary basic mt-4"
            id="newPassword"
            onClick={onSubmit}
          />
        </form>
      </div>
    );
  }
}
