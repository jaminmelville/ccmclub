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
      let thumb = false;
      try {
        thumb = item.acf.feature_image.sizes.thumbnail;
      } catch (e) {
        /* eslint-disable */
        console.error(e);
        /* eslint-enable */
      }
      return (
        <li
          key={item.id}
          className="events__item flex-container align-middle"
        >
          <img
            className="events__image"
            src={thumb}
            alt=""
          />
          <div className="">
            {/* eslint-disable react/no-danger */}
            <h2
              className="events__title"
              dangerouslySetInnerHTML={{ __html: item.title.rendered }}
            />
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
