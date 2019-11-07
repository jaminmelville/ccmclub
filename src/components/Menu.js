import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import svgs from './Svgs';

class Menu extends Component {

  state = {
    active: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setActive);
    window.addEventListener('resize', this.setActive);
    this.setActive();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setActive);
    window.removeEventListener('resize', this.setActive);
  }

  setActive = () => {
    const items = this.props.items;
    let active = items[0];
    items.forEach(item => {
      const element = document.getElementById(item.url.replace('/#', ''));
      if (element) {
        const scrollTop = element.getBoundingClientRect().top;
        const middle = window.innerHeight / 2;
        if (scrollTop < middle) {
          active = item;
        }
      }
    });
    this.setState({ active });
  }

  render() {
    const menuItems = this.props.items.map(item => (
      <li
        key={item.url}
      >
        <Link
          to={item.url}
          className={classNames('ccmc-menu__item', {
            'ccmc-menu__item--active': item === this.state.active,
          })}
        >
          <span
            dangerouslySetInnerHTML={{ __html: item.name }}
          />
        </Link>
      </li>
    ))
    return (
      <div className="ccmc-menu hide-for-small-only">
        <ul
          className="menu align-center"
        >
          {menuItems}
          <li>{svgs.cassowary({ fill: '#ffffff' })}</li>
        </ul>
      </div>
    );
  }

}

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Menu;
