import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';
import { slug } from '../utils';

export default class Link extends Component {

  render() {
    let component;
    if (this.props.url.startsWith('/')) {
      let to;
      if (this.props.url.startsWith('/events/')) {
        to = this.props.url;
      }
      else {
        to = `/#${slug(this.props.url)}`;
      }
      component = (
        <ReactLink
          {...this.props}
          to={to}
        >
          {this.props.children}
        </ReactLink>
      );
    } else {
      component = (
        <a
          href={this.props.url}
          {...this.props}
          target="_blank"
        >
          {this.props.children}
        </a>
      );
    }
    return component;
  }

}

/* eslint-disable react/forbid-prop-types */
Link.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
