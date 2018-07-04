import React from 'react';
import Navbar from '../../Navbar/Container/navbar';
import Content from '../Template/aboutPageContent';
import Footer from '../../Footer/footer';

const AboutPage = (location) => {
  const { pathname } = location;
  return (
    <div id="about-page">
      <Navbar path={pathname} />
      <Content />
      <Footer />
    </div>
  );
};

export default AboutPage;
