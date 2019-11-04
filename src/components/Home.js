import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import Content from './Content';

export default class Home extends Component {

  render() {
    return (
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
              <img className="home__logo" src={`${process.env.PUBLIC_URL}/logo.svg`} alt="logo" />
            </div>
            <div className="auto">
              <h1 className="home__title"
                  dangerouslySetInnerHTML={{ __html: this.props.settings.site.name }}
              />
            </div>
          </div>
        </div>
      </Content>
    );
  }

}

Home.propTypes = {
  events: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
}
