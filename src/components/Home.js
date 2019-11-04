import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import Events from './Events';
import Contact from './Contact';
import Menu from './Menu';
import Page from './Page';
import Content from './Content';

export default class Home extends Component {

  render() {
    const pages = this.props.pages.map(page => <Page key={page.title.rendered} data={page} />)
    return (
      <>
        <Content
          background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/home.jpg"
        >
          <div className="home align-middle align-center">
            <div className="home__social">
              <a href="https://www.facebook.com/cassowarycoastmultisportclub" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="home__social-icon" icon={faFacebookSquare} />
              </a>
            </div>
            <div className="grid-x grid-margin-x align-middle align-center grid-margin-y">
              <div className="small-12 medium-shrink cell text-center">
                <img className="home__logo" src="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/logo.png" alt="logo" />
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
        </Content>
        <Menu
          events={this.props.events}
          pages={this.props.pages}
        />
        <Events events={this.props.events} />
        {pages}
        <Contact
          contact={this.props.settings.contact}
        />
      </>
    );
  }

}

Home.propTypes = {
  events: PropTypes.array.isRequired,
}
