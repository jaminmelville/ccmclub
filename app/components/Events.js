import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Content from './Content';
import Tags from './Tags';

export default class Events extends Component {

  render() {
    const items = this.props.events.map((item) => {
      const time = moment(item.acf.date, 'M/D/YY h:mm a');
      return (
        <li
          key={item.id}
          className="events__item flex-container align-middle"
        >
          <img
            className="events__image"
            src={item.acf.feature_image.sizes.thumbnail}
            alt=""
          />
          <div className="">
            <h2 className="events__title">{item.title.rendered}</h2>
            <div className="events__date">{time.format('Do MMM YYYY')}</div>
            <Tags tags={item.acf.tags} />
            <Link
              to={`/events/${item.slug}`}
              className="button events__button"
            >
              More info
            </Link>
          </div>
        </li>
      )
    });
    return (
      <Content title="Events">
        <ul className="events">
          {items}
        </ul>
      </Content>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Events.propTypes = {
  events: PropTypes.array.isRequired,
}
