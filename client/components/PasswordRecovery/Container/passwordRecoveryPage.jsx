import React from 'react';
import Navbar from '../../Navbar/Container/navbar';
import Footer from '../../Footer/Container/footer';
import Form from '../Template/Form/recoveryForm';

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
    );
  }
}
