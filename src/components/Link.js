import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Link as ReactLink } from 'react-router-dom';

export default class Link extends Component {

  render() {
    let component;
    if (this.props.url.startsWith('/')) {
      component = (
        <ReactLink
          {...this.props}
          to={this.props.url}
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
          rel="noopener noreferrer"
        >
          {this.props.children}
          {' '}
          <FontAwesomeIcon icon={faExternalLinkAlt} />
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
