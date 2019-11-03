import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as ReactLink } from 'react-router-dom';

export default class Link extends Component {

  render() {
    let component;
    if (this.props.url.startsWith('/')) {
      component = (
        <ReactLink to={this.props.url} {...this.props}>
          {this.props.children}
        </ReactLink>
      );
    } else {
      component = (
        <a href={this.props.url} {...this.props} target="_blank">
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
