import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Content extends Component {

  render() {
    return (
      <div className="content">
        <h1 className="content__title">
          <div className="grid-container content__grid-container">
            {this.props.title}
          </div>
        </h1>
        <div className="grid-container content__grid-container">
          {this.props.children}
        </div>
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Content.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
