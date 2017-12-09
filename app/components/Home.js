import React, { Component } from 'react';

export default class Home extends Component {

  render() {
    return (
      <div className="home align-middle align-center">
        <div className="home__social">
          <a href="https://www.facebook.com/cassowarycoastmultisportclub" target="_blank" rel="noopener noreferrer">
            <i className="home__social-icon fa fa-facebook-official" />
          </a>
        </div>
        <div className="grid-x grid-margin-x align-middle align-center grid-margin-y">
          <div className="small-12 medium-shrink cell text-center">
            <img className="home__logo" src="/wp-content/themes/ccmclub/images/logo.png" alt="logo" />
          </div>
          <div className="auto">
            <h1 className="home__title">
              Cassowary<br />
              Coast<br />
              Multisports<br />
              Club
            </h1>
          </div>
        </div>
      </div>
    );
  }

}
