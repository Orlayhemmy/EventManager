import React from 'react'; // eslint-disable-line

const tour = props => (
  <div id="tour" className="tour pagination-icon w-auto" onClick={props.tour}>
    <i className="fa fa-bus-alt" />
    <p class="tooltiptext">Take a tour</p>
  </div>
);
export default tour;
