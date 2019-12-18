import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

export default class Sponsors extends Component {

  render() {
    const sortedSponsors = this.props.sponsors.sort((a, b) => Math.sign(a - b));
    const sponsors = sortedSponsors.map(sponsor => (
      <div key={sponsor.id} className="sponsors__sponsor text-center">
        <a
          href={sponsor.acf.link}
          target="_blank"
          className="sponsors__link"
        >
          <div
            style={{
              backgroundImage: `url(${sponsor.acf.image.sizes.medium})`
            }}
            className="sponsors__image"
          />
          <br />
          <h3 className="text-uppercase">{sponsor.acf.name}</h3>
        </a>
      </div>
    ));
    return (
      <Content
        title="Sponsors"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/mud.jpg"
      >
        <div className="sponsors flex-container align-spaced">
          {sponsors}
        </div>
      </Content>
    );
  }

}

Sponsors.propTypes = {
  sponsors: PropTypes.array.isRequired,
};
