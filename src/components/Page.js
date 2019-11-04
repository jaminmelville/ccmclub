import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

export default class Page extends Component {

  render() {
    return (
      <Content
        id={this.props.data.slug}
        title={this.props.data.title.rendered}
        background={this.props.data.acf.background.sizes.large}
      >
        {!!this.props.data.acf.feature_image &&
          <img
            className="page__image"
            src={this.props.data.acf.feature_image.sizes.large}
            alt=""
          />
        }
        {/* eslint-disable react/no-danger */}
        <p
          className="page__body"
          dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered }}
        />
      </Content>
    );
  }

}

Page.propTypes = {
  data: PropTypes.object.isRequired,
};
