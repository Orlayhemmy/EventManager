import React from 'react';

export default class Carousel extends React.Component {
  render() {
    let centerList;
    let carouselIndicator;
    const { centers } = this.props.centerState;
    centerList = centers.map((center, index) => {
      const { centerName, location, imageUrl } = center;
      return (
        <div
          class={index === 0 ? 'carousel-item active' : 'carousel-item'}
          key={index}
        >
          <img class="d-block w-100 h-350" src={imageUrl} alt={centerName} />
          <div class="carousel-caption d-none d-md-block">
            <h5>{centerName}</h5>
            <p>{location}</p>
          </div>
        </div>
      );
    });
    carouselIndicator = centers.map((center, index) => (
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to={index}
          class={index === 0 ? 'active' : ''}
          key={index}
        />
    ));
    return (
      <div className="col-lg-6 form" id="carousel">
        <h1>Our Centers</h1>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">{carouselIndicator}</ol>
          <div class="carousel-inner">{centerList}</div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
