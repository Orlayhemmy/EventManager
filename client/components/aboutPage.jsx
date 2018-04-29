import React from 'react';

import Navbar from './Navbar.jsx';
import Content from './AboutPage/aboutPageContent.jsx';
import Footer from './Footer.jsx';


export default class AboutPage extends React.Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="page-wrapper">
        <div id="about-page">
          <Navbar path={pathname}/>
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}