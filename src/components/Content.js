import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { slug } from '../utils';

export default class Content extends Component {

  render() {
    return (
      <div
        id={!!this.props.id ? slug(this.props.id) : null}
        className="content"
      >
        <div
          className="content__background"
          style={{ backgroundImage: `url(${this.props.background})` }}
        />
        <h1 className="content__title">
          {/* eslint-disable react/no-danger */}
          <div
            className="grid-container content__grid-container"
            dangerouslySetInnerHTML={{ __html: this.props.title }}
          />
        </h1>
        <div className="grid-container content__grid-container width-100">
          {this.props.children}
        </div>
      </div>
    );
  }

}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  background: PropTypes.string.isRequired,
};
