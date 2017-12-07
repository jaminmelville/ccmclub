import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import Loader from './Loader';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
jsx-a11y/no-static-element-interactions */
export default class Photos extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      images: [],
      loading: true,
      modal: null,
      showing: 20,
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
    let modal;
    if (this.state.modal) {
      const index = this.state.images.indexOf(this.state.modal);
      const next = this.state.images[(index + 1) % this.state.images.length];
      const previous = this.state.images[index > 0 ? index - 1 : this.state.images.length - 1];
      modal = (
        <Portal>
          <div
            className="photos__portal"
            onClick={() => {
              this.setState({ modal: null });
            }}
          >
            <div
              className="photos__portal-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <i
                className="photos__portal-close fa fa-times"
                onClick={() => {
                  this.setState({ modal: null });
                }}
              />
              <i
                className="photos__portal-previous fa fa-chevron-left"
                onClick={() => {
                  this.setState({ modal: previous });
                }}
              />
              <i
                className="photos__portal-next fa fa-chevron-right"
                onClick={() => {
                  this.setState({ modal: next });
                }}
              />
              <img className="photos__portal-img" src={this.state.modal.images[0].source} alt="" />
            </div>
          </div>
        </Portal>
      );
    }
    return (
      <div>
        {modal}
        <InfiniteScroll
          element="ul"
          className="grid-x grid-margin-x grid-margin-y"
          loadMore={() => {
            this.setState({ showing: this.state.showing + 20 });
          }}
          hasMore={this.state.showing < this.state.images.length}
          loader={<Loader />}
        >
          {images}
        </InfiniteScroll>
        {this.state.loading && <Loader />}
        <br />
      </div>
    );
  }

}

/* eslint-disable react/forbid-prop-types */
Photos.propTypes = {
  data: PropTypes.object.isRequired,
};
