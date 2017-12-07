import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from './Loader';

export default class Page extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      item: null,
      loading: true,
    };
  }

  componentDidMount() {
    axios.get(`/wp-json/wp/v2/pages?slug=${this.props.match.params.slug}`)
      .then((response) => {
        this.setState({ item: response.data[0], loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <Loader />
          :
          <div className="grid-x grid-padding-x grid-padding-y align-top">
            <div className="medium-6 cell text-right page__title">
              <h1>
                {this.state.item.title.rendered}
              </h1>
              <img
                className="page__image"
                src="/wp-content/themes/ccmclub/images/rainforest.jpg"
                alt=""
              />
            </div>
            <div className="medium-6 cell">
              {/* eslint-disable react/no-danger */}
              <p dangerouslySetInnerHTML={{ __html: this.state.item.content.rendered }} />
            </div>
          </div>
        }
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Page.propTypes = {
  match: PropTypes.object.isRequired,
};
