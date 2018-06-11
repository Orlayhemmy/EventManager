import React from 'react';
import { Link } from 'react-router-dom';

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="col-lg-8">
        <div className="jumbotron text-center">
          <h1>event center</h1>
          <Link to="/imageupload"><h2>...celebrate in style...</h2></Link>
        </div>
      </div>
    );
  }
}