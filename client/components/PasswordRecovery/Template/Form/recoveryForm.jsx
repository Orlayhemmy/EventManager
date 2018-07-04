/* eslint disable */
import React from 'react';
import EmailVerify from './emailVerification';
import CodeContainer from './codeContainer';
import NewPassword from './newPassword';
/**
 * @description PasswordRecoveryForm component
 */
export default class PasswordRecoveryForm extends React.Component {
  /**
   * @memberof PasswordRecoveryForm
   * @method render
   * @description it renders the component
   * @returns the HTML of PasswordRecoveryForm
   */
  render() {
    let form;
    const { state, onSubmit, onChange, message, swap } = this.props;
    const heading = (
      <span>
        <strong class="text-primary">
          lets help you get back into your account
        </strong>
      </span>
    );
    return (
      <div>
        <NewPassword
          heading={heading}
          message={message}
          onSubmit={onSubmit}
          onChange={onChange}
          formState={state}
        />
        <CodeContainer
          heading={heading}
          message={message}
          onSubmit={onSubmit}
          formState={state}
          onChange={onChange}
          swap={swap}
        />
        <EmailVerify
          heading={heading}
          message={message}
          onSubmit={onSubmit}
          formState={state}
          onChange={onChange}
          swap={swap}
        />
      </div>
    );
  }
}
