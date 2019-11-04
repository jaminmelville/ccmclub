import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from './Link';

class Menu extends Component {

  render() {
    const items = [
      {
        name: 'Home',
        url: '/' },
      {
        name: 'Events',
        url: '/events',
      },
    ];
    this.props.pages.forEach((item) => {
      items.push({
        name: item.title.rendered,
        url: `/${item.slug}`,
      });
    });
    items.push({
      name: 'Contact',
      url: '/contact',
    });
    const menuItems = items.map(item => (
      <li key={item.url}>
        <Link
          url={item.url}
        >
          <span
            dangerouslySetInnerHTML={{ __html: item.name }}
          />
        </Link>
      </li>
    ))
    return (
      <div className="ccmc-menu">
        <ul
          className="menu align-center"
        >
          {menuItems}
        </ul>
      </div>
    );
  }

}

Menu.propTypes = {
  events: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
};

export default Menu;
