import React from 'react';
import Navbar from '../../Navbar/Container/Navbar';
import Content from '../Template/AboutPageContent';
import Footer from '../../Footer/Footer';

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
