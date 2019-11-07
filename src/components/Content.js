import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Content extends Component {

  render() {
    return (
      <div
        id={this.props.id}
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
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  background: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Content.defaultProps = {
  id: '',
  title: '',
};
