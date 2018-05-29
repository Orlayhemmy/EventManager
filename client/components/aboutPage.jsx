import React from 'react';

import Navbar from './Navbar.jsx';
import Content from './AboutPage/AboutPageContent.jsx';
import Footer from './footer.jsx';


export default class AboutPage extends React.Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div id="about-page">
        <Navbar path={pathname}/>
        <Content />
        <Footer />
      </div>
    );
  }
}