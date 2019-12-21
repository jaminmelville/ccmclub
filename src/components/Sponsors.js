import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

export default class Sponsors extends Component {

  render() {
    const sortedSponsors = this.props.sponsors.sort((a, b) => Math.sign(a - b));
    const sponsors = sortedSponsors.map(sponsor => (
      <a
        key={sponsor.id}
        href={sponsor.acf.link}
        target="_blank"
        className="sponsors__sponsor text-center"
        title={sponsor.acf.name}
      >
        <div
          style={{
            backgroundImage: `url(${sponsor.acf.image.sizes.medium})`
          }}
          className="sponsors__image"
        />
      </a>
    ));
    return (
      <Content
        title="Sponsors"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/mud.jpg"
      >
        <div className="sponsors flex-container align-center">
          {sponsors}
        </div>
      </Content>
    );
  }

}

Sponsors.propTypes = {
  sponsors: PropTypes.array.isRequired,
};
