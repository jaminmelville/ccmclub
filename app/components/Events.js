import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Events extends Component {

  render() {
    const items = this.props.events.map(item => (
      <li key={item.id} className="events__item grid-x grid-margin-x grid-margin-y">
        <div className=" medium-4 cell text-right">
          <img
            className="events__image"
            src={item.acf.feature_image.sizes.thumbnail}
            alt=""
          />
        </div>
        <Link
          to={`/events/${item.slug}`}
          className="events__link medium-8 cell"
          onClick={() => {
            window.scroll({
              top: window.innerHeight * 2,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          <h3>{item.title.rendered}</h3>
        </Link>
      </li>
    ));
    return (
      <div>
        <ul>
          {items}
        </ul>
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Events.propTypes = {
  events: PropTypes.array.isRequired,
}
