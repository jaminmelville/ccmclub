import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import moment from 'moment';
import ReactGa from 'react-ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Countdown from './Countdown';
import Content from './Content';
import Tags from './Tags';
import Link from './Link';
import Video from './Video';
import Map from './Map';
import OnamissionMaps from './OnamissionMaps';
import Sponsors from './Sponsors';
import $ from 'jquery';
import { Foundation } from 'foundation-sites/js/foundation.core';
import { DropdownMenu } from 'foundation-sites/js/foundation.dropdownMenu.js';
Foundation.plugin(DropdownMenu, 'DropdownMenu');
Foundation.addToJquery($);

class Event  extends React.Component {

  componentDidMount() {
    $(document).foundation();
  }

  render() {
    const time = moment(this.props.event.acf.date, 'M/D/YY h:mm a');
    const buttons = [];
    const slug = this.props.event.slug;
    let hasMap = !!this.props.event.acf.map_embed
    if (hasMap) {
      const match = this.props.event.acf.map_embed.match(/mid=([^&]*)/);
      if (match) {
        buttons.push({ name: 'Map', url: `/events/${slug}#map` });
      } else {
        hasMap = false;
      }
    }
    if (slug === 'onamission') {
      buttons.push({ name: 'Map', url: `/events/${slug}#map` });
      hasMap = false;
    }
    if (this.props.event.acf.youtube_url) {
      buttons.push({ name: 'Video', url: `/events/${slug}#video` });
    }
    if (this.props.event.results.length) {
      buttons.push({ name: 'Results', children: this.props.event.results });
    }
    if (this.props.event.photos.length) {
      buttons.push({ name: 'Photos', children: this.props.event.photos });
    }
    if (slug === 'onamission') {
      buttons.push({ name: 'Vounteer', url: "https://forms.gle/1irPpuuLV3gxBewt9" });
      hasMap = false;
    }
    let imgSrc = false;
    try {
      imgSrc = this.props.event.acf.feature_image.sizes.medium;
    } catch (e) {
      /* eslint-disable */
      console.error(e);
      /* eslint-enable */
    }
    const buttonMarkup = buttons.map((button) => {
      if (button.children) {
        const children = button.children.map(child => (
          <li key={child.id} className="width-100">
            <Link
              className="button dark large"
              url={child.url}
              onClick={() => {
                ReactGa.event({
                  category: 'Event',
                  action: `${button.name} pressed`,
                  label: this.props.event.title.rendered,
                });
              }}
            >
              {child.label}
            </Link>
          </li>
        ));
        return (
          <li
            key={button.name}
          >
            <a className="button hollow large">{button.name}</a>
            <ul className="menu width-100">
              {children}
            </ul>
          </li>
        );
      }
      return (
        <li
          key={button.name}
        >
          <Link
            className="button hollow large"
            url={button.url}
            onClick={() => {
              ReactGa.event({
                category: 'Event',
                action: `${button.name} pressed`,
                label: this.props.event.title.rendered,
              });
            }}
          >
            {button.name}
          </Link>
        </li>
      );
    })
    return (
      <>
        <Link className="show-for-small-only event__back" url="/">
          <FontAwesomeIcon icon={faAngleLeft} /> Back
        </Link>
        <Content
          title={this.props.event.title.rendered}
          background={this.props.event.acf.background.sizes.large}
        >
          <div className="grid-x align-middle align-center">
            <div className="cell shrink text-center">
              {!!this.props.event.acf.date &&
                <div className="event__date">
                  {time.format('dddd Do MMM YYYY')}
                </div>
              }
              {!!this.props.event.acf.date &&
                <Countdown time={time} />
              }
              <Tags tags={this.props.event.acf.tags} />
            </div>
            <div className="cell shrink">
              <img
                className="event__image"
                src={imgSrc}
                alt=""
              />
            </div>
          </div>
          <ul className="dropdown menu vertical medium-horizontal expanded event__buttons" data-dropdown-menu>
            {!!this.props.event.acf.registration_url &&
              <li>
                <a
                  className="button large"
                  href={this.props.event.acf.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    ReactGa.event({
                      category: 'Event',
                      action: 'Visited register site',
                      label: this.props.event.title.rendered,
                    });
                  }}
                >
                  Register now
                  {' '}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </li>
            }
            {buttonMarkup}
          </ul>
          {/* eslint-disable react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: this.props.event.content.rendered }} />
        </Content>
        {hasMap &&
          <Map
            data={this.props.event}
          />
        }
        <Route path="/events/onamission">
          <OnamissionMaps />
        </Route>
        {this.props.event.sponsors.length > 0 &&
          <Sponsors
            sponsors={this.props.event.sponsors}
          />
        }
        {!!this.props.event.acf.youtube_url &&
          <Video
            data={this.props.event}
          />
        }
      </>
    );
  }
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
