import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Content from './Content';
import Tags from './Tags';

window.moment =  moment;
export default class Events extends Component {

  render() {
    const sorted = this.props.events.sort((a, b) => {
      if (!a.acf.date && !b.acf.date) {
        return 0;
      }
      if (!a.acf.date) {
        return 1;
      }
      if (!b.acf.date) {
        return -1;
      }
      return Math.sign(moment(a.acf.date, 'M/D/YY h:mm a').diff(moment(b.acf.date, 'M/D/YY h:mm a')));
    });
    const items = sorted.map((item) => {
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
            <div className="events__date">{item.acf.date ? time.format('Do MMM YYYY'): 'Date to be confirmed'}</div>
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
      <Content
        title="Events"
        id="events"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/events.jpg"
      >
        <ul className="events">
          {items}
        </ul>
      </Content>
    );
  }

}

Events.propTypes = {
  events: PropTypes.array.isRequired,
}
