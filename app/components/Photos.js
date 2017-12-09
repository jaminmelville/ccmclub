import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import Lightbox from 'react-images';
import Loader from './Loader';
import Content from './Content';


/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
export default class Photos extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      images: [],
      loading: true,
      modal: null,
      showing: 24,
    };
  }

  componentDidMount() {
    const albumId = this.props.data.acf.facebook_album_url.match(/album_id=(\d*)/)[1];
    axios.get(`/wp-json/fb/v1/album/${albumId}`)
      .then((response) => {
        this.setState({ images: response.data, loading: false });
      });
  }

  render() {
    const images = this.state.images.slice(0, this.state.showing).map(item => (
      <li key={item.id} className="small-6 medium-4 large-2 cell">
        <div className="photos__square">
          <img
            src={item.images[item.images.length - 1].source}
            alt=""
            className="photos__img"
            onClick={() => {
              this.setState({ modal: item });
            }}
          />
        </div>
      </li>
    ));
    const index = this.state.images.indexOf(this.state.modal);
    const next = this.state.images[(index + 1) % this.state.images.length];
    const previous = this.state.images[index > 0 ? index - 1 : this.state.images.length - 1];
    const imagesData = this.state.images.map((image) => {
      const srcSet = image.images.map(i => `${i.source} ${i.width}w`);
      return {
        src: image.images[0].source,
        srcSet,
      };
    });
    return (
      <Content title={`${this.props.data.title.rendered} Photos`}>
        <Lightbox
          isOpen={!!this.state.modal}
          images={imagesData}
          currentImage={index}
          onClose={() =>
            this.setState({ modal: null })
          }
          onClickPrev={() =>
            this.setState({ modal: previous })
          }
          onClickNext={() =>
            this.setState({ modal: next })
          }
        />
        <InfiniteScroll
          element="ul"
          className="grid-x grid-margin-x grid-margin-y"
          loadMore={() => {
            this.setState({ showing: this.state.showing + 24 });
          }}
          hasMore={this.state.showing < this.state.images.length}
          loader={<Loader />}
        >
          {images}
        </InfiniteScroll>
        {this.state.loading && <Loader />}
        <br />
      </Content>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Photos.propTypes = {
  data: PropTypes.object.isRequired,
};
