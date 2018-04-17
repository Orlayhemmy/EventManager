import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    events: store.event.events,
    dates: store.event.disableDates,
  }
})

export default class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      date: ['2018-19-01'],
    }
  }
  onClick(id) {
    <script>
       function loadDate(id){
        
        $('#date').datepicker({
          format:'yyyy-mm-dd',
          autoclose:true,
          datesDisabled: id,
        })
      };
    </script>
  }

  render() {
    let date = new Date();
    return (
      <div class="form-group">
      <label for="name">Date</label>    
      <input type="text" id="date" onClick={() => this.onClick(this.props.dates)} data-date={this.props.dates} name="date" class="form-control"/>
    </div>
    )
  }
}