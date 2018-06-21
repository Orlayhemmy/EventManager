import React from 'react';
import SignUp from '../Form/SignUp';

/**
 * @description Signin form component
 */
export default class HomeContent extends React.Component {
  /**
   * @memberof HomeContent
   * @method render
   * @description it renders the component
   * @returns the HTML of homecontent component
   */
  render() {
    return (
      <div className="container" id="homepage">
        <div className="main-content">
          <div className="row">
            <div className="col-lg-6 intro">
              <h1>Book The Best Center</h1>
              <p>
                Hotel icons, booking and reservation ready and thirteen HTML
                pages, that is roughly said what Colina delivers. Of course,
                there is more. Due to the popularity of mobile users, Colina has
                a mobile-first approach to its web design. But in general, all
                users will experience top-notch and highly adaptable website
                that you are yet to make.
              </p>
              <p>
                Andela’s business model is simply translating brilliant minds
                into world-class developers and inculcating them into software
                engineering teams around the world, to solve the problem of
                shortage of tech talent and also help achieve quality product
                build. Andela proffers solution to companies or individuals
                which are commonly referred to as partners with a shortage of
                technological team or in need of proficient and experienced
                software personnel by offering them world-class developers to
                solve their challenges or bring their ideas into reality using
                technological tools
              </p>
            </div>
            <div className="col-lg-6 form">
              <h1>Get started</h1>
              <SignUp 
                homeProps={this.props}
              />
            </div>
          </div>
        </div>
        <div className="row subcontent pb-4">
          <div className="col-lg-4">
            <div className="row center">
              <span class="icon">
                <i className="fa fa-dollar" />
              </span>
            </div>
            Hotel icons, booking and reservation ready and thirteen HTML pages,
            that is roughly said what Colina delivers. Of course, there is more.
            Due to the popularity of mobile users, Colina has a mobile-first
            approach to its web design. But in general, all users will
            experience top-notch and highly adaptable website that you are yet
            to make.
          </div>
          <div className="col-lg-4">
            <div className="row center">
              <span class="icon">
                <i className="fa fa-lock" />
              </span>
            </div>
            Hotel icons, booking and reservation ready and thirteen HTML pages,
            that is roughly said what Colina delivers. Of course, there is more.
            Due to the popularity of mobile users, Colina has a mobile-first
            approach to its web design. But in general, all users will
            experience top-notch and highly adaptable website that you are yet
            to make.
          </div>
          <div className="col-lg-4">
            <div className="row center">
              <span class="icon">
                <i className="fa fa-thumbs-up" />
              </span>
            </div>
            Hotel icons, booking and reservation ready and thirteen HTML pages,
            that is roughly said what Colina delivers. Of course, there is more.
            Due to the popularity of mobile users, Colina has a mobile-first
            approach to its web design. But in general, all users will
            experience top-notch and highly adaptable website that you are yet
            to make.
          </div>
        </div>
      </div>
    );
  }
}



