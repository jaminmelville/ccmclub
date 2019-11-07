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
          <img
            src={sponsor.acf.image.sizes.thumbnail}
            alt={sponsor.acf.name}
            className="sponsors__image"
          />
          <br />
          {sponsor.acf.name}
        </a>
      </div>
    ));
    return (
      <Content
        title="Sponsors"
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
