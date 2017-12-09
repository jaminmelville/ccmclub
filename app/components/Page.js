import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

export default class Page extends Component {

  render() {
    return (
      <Content title={this.props.data.title.rendered}>
        <img
          className="page__image"
          src={this.props.data.acf.feature_image.sizes.large}
          alt=""
        />
        {/* eslint-disable react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered }} />
      </Content>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Page.propTypes = {
  data: PropTypes.object.isRequired,
};
