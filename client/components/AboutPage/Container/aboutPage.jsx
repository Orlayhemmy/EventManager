import React from 'react';
import Navbar from '../../Navbar/Container/navbar';
import Content from '../Template/aboutPageContent';
import Footer from '../../Footer/footer';

export default class AboutPage extends React.Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div id="about-page">
        <Navbar path={pathname} />
        <Content />
        <Footer />
      </div>
    );
  }
}