/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

const $ = require('jquery');
import { Foundation } from 'foundation-sites/js/foundation.core';
import { ResponsiveMenu } from 'foundation-sites/js/foundation.responsiveMenu.js';
import { ResponsiveToggle } from 'foundation-sites/js/foundation.responsiveToggle.js';
import { AccordionMenu } from 'foundation-sites/js/foundation.accordionMenu.js';
Foundation.addToJquery($);
Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
Foundation.plugin(AccordionMenu, 'AccordionMenu');
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');

class Menu extends Component {

  componentDidMount() {
    $(document).foundation();
    var elem = new Foundation.AccordionMenu($(this.menu), {
      submenuToggle: true,
      multiOpen: false,
    });
  }

  generateChildren = (items, nested = false) => {
    const children = items.map((item) => {
      const pathname = this.props.location.pathname;
      const isActive = false && pathname === item.url; // @TODO: Figure out activeness.
      return (
        <li
          key={item.name}
          className={classNames({ 'is-active': isActive })}
        >
          {item.url.startsWith('/') ?
            <Link to={item.url}>
              {item.name}
            </Link>
          :
            <a href={item.url} target="_blank">
              {item.name}
            </a>
          }
          {typeof(item.children) !== "undefined" &&

            <ul
              className="vertical menu nested"
            >
              {this.generateChildren(item.children, true)}
            </ul>
          }
        </li>
      )
    });
    return children;
  }

  render() {
    const events = this.props.events.map((event) => {
      const children = [];
      const slug = event.slug;
      if (event.acf.youtube_url) {
        children.push({ name: 'Video', url: `/events/${slug}/video` });
      }
      if (event.acf.map_embed) {
        children.push({ name: 'Map', url: `/events/${slug}/map` });
      }
      if (event.acf.facebook_album_url) {
        children.push({ name: 'Photos', url: `/events/${slug}/photos` });
      }
      if (event.acf.results_url) {
        children.push({ name: 'Results', url: props.data.acf.results_url });
      }
      return {
        name: event.title.rendered,
        url: `/events/${event.slug}`,
        children,
      };
    });
    const items = [
      {
        name: 'Home',
        url: '/' },
      {
        name: 'Events',
        url: '/events',
        children: events,
      },
    ];
    this.props.pages.forEach((item) => {
      items.push({
        name: item.title.rendered,
        url: `/${item.slug}`
      });
    });
    items.push({
      name: 'Contact',
      url: '/contact'
    });
    return (
      <div className="ccmc-menu">
        <ul
          className="vertical menu accordion-menu"
          ref={(e) => { this.menu = e; }}
        >
          {this.generateChildren(items)}
        </ul>
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Menu.propTypes = {
  events: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
};

export default withRouter(Menu);
