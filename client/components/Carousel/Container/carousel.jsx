import React from 'react';

const Carousel = (centerState) => {
  let centerList;
  let carouselIndicator;
  const { centers } = centerState;
  if (centers.length > 0) {
    centerList = centers.map((center, index) => {
      const { centerName, location, imageUrl } = center;
      return (
        <div
          className={index === 0 ? 'carousel-item active' : 'carousel-item'}
          key={index} // eslint-disable-line
        >
          <img className="d-block w-100 h-350" src={imageUrl} alt={centerName} />
          <div className="carousel-caption d-none d-md-block">
            <h5>
              {centerName}
            </h5>
            <p>
              {location}
            </p>
          </div>
        </div>
      );
    });
    carouselIndicator = centers.map((center, index) => (
      <li
        data-target="#carouselExampleIndicators"
        data-slide-to={index}
        className={index === 0 ? 'active' : ''}
        key={index} // eslint-disable-line
      />
    ));
  }
  return (
    <div className="col-lg-6 form">
      <h1>
        Our Centers
      </h1>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {carouselIndicator}
        </ol>
        <div className="carousel-inner">
          {centerList}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">
          Previous
          </span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">
            Next
          </span>
        </a>
      </div>
    </div>
  );
};
export default Carousel;
