/* eslint-disable */
const welcome = `
  <div>
    <h1 class="main-color text-center">Welcome</h1>
    <p>Lets take you on a tour on how to book an event</p>
  </div>
`;
const sampleDateButton = `<button class="btn btn-success ml-2 mb-3">
07-07-2017 <i class="fa fa-times"></i>
</button>`;

const dateInfo = `The dates you selected will be displayed like this
<div class="text-center"> ${sampleDateButton} </div> You can click on the times sign on the date to remove it from the date list`;

export const addEventIntro = () => {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        intro: welcome
      },
      {
        element: '#step1',
        intro: 'You can search for centers by clicking this button',
        position: 'left'
      },
      {
        element: '#centerId',
        intro:
          'The centers will be shown here. You can click on any of the center to select it',
        position: 'bottom'
      },
      {
        element: '#step3',
        intro: 'You will see the details of the center selected here',
        position: 'right'
      },
      {
        element: '#bookedDate',
        intro: 'Choose a date',
        position: 'bottom'
      },
      {
        element: '#add-event',
        intro:
          'Click the select button. If your event is going to last more than a day, just choose the date and hit the select button each time',
        position: 'left'
      },
      {
        element: '#chosenDates',
        intro: dateInfo,
        position: 'bottom'
      },
      {
        element: '#eventTitle',
        intro: 'Give your event a title',
        position: 'bottom'
      },
      {
        element: '#description',
        intro: 'Write a brief description for your event',
        position: 'top'
      },
      {
        element: '#submit-event',
        intro: 'Click the submit to book the event',
        position: 'top'
      },
      {
        element: '#tour',
        intro: 'You can click on this icon to take the tour anytime. ',
        position: 'top'
      }
    ]
  });
  intro.start();
};
const centersIntro = `
  <div>
    <h1 class="main-color text-center">Welcome</h1>
    <p>Lets take you on a tour on how to book an event</p>
  </div>
`;
const nextButton = `<div class="pagination-icon mb-1"><i class="fa fa-chevron-up icon"></i></div>`;
const previousButton = `<div class="pagination-icon mb-1"><i class="fa fa-chevron-down icon"></i></div>`;
const watchBox = `<div id="goto-page"><input type="text" value="1" class="form-control w-1" disabled/></div>`
const pagination = `${nextButton} Next center list ${previousButton} Previous center list ${watchBox} The current page`;
const searchPage = `
  <div class="inner-item-div" style="position:relative" id="inner-item-div">
    <div class="inner-item">
      <input
        type="text"
        value="3"
        id="goto"
        class="form-control w-1 ml-1"
      />
    </div>
    <div class="inner-item">
      <input
        type="button"
        class="btn btn-success page-btn ml-1"
        value="Go"
      />
    </div>
  </div>`
const info = ` When you click on the current page box ${watchBox} this field ${searchPage} appears and you can type in the page number you want and click the go button`;
export const centerIntro = () => {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        intro: centersIntro
      },
      {
        element: '#search-centers',
        intro: 'You can filter centers by clicking this button',
        position: 'left'
      },
      {
        element: '#centers',
        intro: 'The centers will be shown here.',
        position: 'top'
      },
      {
        element: '#pagination-container',
        intro: 'You can view other centers by clicking on the buttons here',
        position: 'right'
      },
      {
        element: '#pagination-container',
        intro: pagination,
        position: 'right'
      },
      {
        element: '#pagination-container',
        intro: info,
        position: 'right'
      },
      {
        element: '#tour',
        intro: 'You can click on this icon to take the tour anytime. ',
        position: 'top'
      }
    ]
  });
  intro.start();
};
