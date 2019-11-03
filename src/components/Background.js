import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
class Background extends Component {

/* eslint-disable */

  getPageUrl = (slug) => {
    const page = this.props.pages.filter(p =>
      p.slug === slug,
    ).pop();
    let image = false;
    try {
      image = page.acf.background.sizes.large;
    } catch (e) {
        /* eslint-disable */
        console.error(e);
        /* eslint-enable */
    }
    return image;
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
    return (
        <Switch key={this.props.location.key} location={this.props.location}>
          <Route
            path="/events/:event/map"
            render={(props) => {
              const url = 'https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/map.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/events/:event/video"
            render={(props) => {
              const url = 'https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/video.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/events/:event/photos"
            render={(props) => {
              const url = 'https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/photos.jpg';
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
              const url = 'https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/events.jpg';
              return this.generateMarkup(url);
            }}
          />
          <Route
            path="/contact"
            render={(props) => {
              const url = 'https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/contact.jpg';
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
              const url = 'https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/home.jpg';
              return this.generateMarkup(url);
            }}
          />
        </Switch>
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
