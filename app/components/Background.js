import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

/* eslint-disable react/prefer-stateless-function */
class Background extends Component {

/* eslint-disable */

  getPageUrl = (slug) => {
    const page = this.props.pages.filter(p =>
      p.slug === slug,
    ).pop();
    return page.acf.background.sizes.large;
  }

  generateMarkup(url) {
    return (
      <div
        className="background"
        key={url}
        style={{ backgroundImage: `url(${url})` }}
      />
    );
  }

  render() {
    if (this.props.pages.length === 0) {
      return null;
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="background"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <Switch key={this.props.location.key} location={this.props.location}>
          <Route
            path="/events/:event/map"
            render={(props) => {
              const url = '/wp-content/themes/ccmclub/images/map.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/events/:event/video"
            render={(props) => {
              const url = '/wp-content/themes/ccmclub/images/video.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/events/:event/photos"
            render={(props) => {
              const url = '/wp-content/themes/ccmclub/images/camera.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/events/:event/"
            render={(props) => {
              const url = this.getPageUrl(props.match.params.event);
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/events/"
            render={(props) => {
              const url = '/wp-content/themes/ccmclub/images/bike.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/contact"
            render={(props) => {
              const url = '/wp-content/themes/ccmclub/images/contact.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/:slug"
            render={(props) => {
              const url = this.getPageUrl(props.match.params.slug);
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/"
            exact
            render={(props) => {
              const url = '/wp-content/themes/ccmclub/images/run.jpg';
              return this.generateMarkup(url);
            }}
          />
        </Switch>
      </ReactCSSTransitionGroup>
    );
  }

}

Background.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pages: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
  })),
};


Background.defaultProps = {
  pages: [],
};

export default withRouter(Background);
