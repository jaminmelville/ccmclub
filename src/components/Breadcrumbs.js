import React from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

const Breadcrumbs = function render(props) {
  const here = props.location.pathname.split('/').filter(p => p !== '');
  if (here.length === 0) {
    return null;
  }
  const trails = [
    <li key="/"><Link className="ccmc-breadcrumbs__parent" to="/">Home</Link></li>,
  ];
  for (let i = 0; i < here.length; i += 1) {
    const link = `/${here.slice(0, i + 1).join('/')}/`;
    const text = here[i].replace('-', ' ');
    let trail;
    if (i < here.length - 1) {
      trail = (
        <li key={link}>
          <Link className="ccmc-breadcrumbs__parent" to={link}>{text}</Link>
        </li>
      );
    } else {
      trail = (
        <li className="ccmc-breadcrumbs__current" key={link}>
          <span className="show-for-sr">Current: </span> {text}
        </li>
      );
    }
    trails.push(trail);
  }
  return (
    <nav className="ccmc-breadcrumbs" aria-label="You are here:">
      <ul className="breadcrumbs">
        {trails}
      </ul>
    </nav>
  );
};

/* eslint-disable react/forbid-prop-types */
Breadcrumbs.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Breadcrumbs);
