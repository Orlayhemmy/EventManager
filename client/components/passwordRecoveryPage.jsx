import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Form from './passwordRecovery/RecoveryForm';

/**
 * @description PasswordRecovery component
 */
export default class PasswordRecovery extends React.Component {
  /**
   * @memberof PasswordRecovery
   * @method render
   * @description it renders the component
   * @returns the HTML of PasswordRecovery
   */
  render() {
    return (
      <div id="recover-password">
        <Navbar />
        <div className="container">
          <div className="row">
          <div className="col-lg-4">
            <div className="form-outer text-center">
              <div className="form-inner">
                <Form />
              </div>
            </div>
          </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}