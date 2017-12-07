import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function pad(n) {
  return (n < 10) ? (`0${n}`) : n;
}

export default class Countdown extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      now: moment(),
    };
  }

  componentDidMount() {
    this.inverval = setInterval(() => {
      this.setState({
        now: moment(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  render() {
    const isBefore = this.state.now.isBefore(this.props.time);
    const days = isBefore ? this.props.time.diff(this.state.now, 'days') : 0;
    const hours = isBefore ? this.props.time.diff(this.state.now, 'hours') % 24 : 0;
    const minutes = isBefore ? this.props.time.diff(this.state.now, 'minutes') % 60 : 0;
    const seconds = isBefore ? this.props.time.diff(this.state.now, 'seconds') % 60 : 0;
    return (
      <div className="countdown">
        <div className="countdown__values">
          {pad(days)}|{pad(hours)}|{pad(minutes)}|{pad(seconds)}
        </div> to go
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Countdown.propTypes = {
  time: PropTypes.object.isRequired,
};
