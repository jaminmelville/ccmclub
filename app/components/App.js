/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import moment from 'moment';
import Home from '../components/Home';
import Menu from '../components/Menu';
import Contact from '../components/Contact';
import Events from '../components/Events';
import Page from '../components/Page';
import Event from '../components/Event';
import Photos from '../components/Photos';
import Video from '../components/Video';
import Map from '../components/Map';
import Background from '../components/Background';
import Loader from '../components/Loader';

const $ = require('jquery');
import { Foundation } from 'foundation-sites/js/foundation.core';
import { OffCanvas } from 'foundation-sites/js/foundation.offcanvas.js';
import { Sticky } from 'foundation-sites/js/foundation.sticky.js';
Foundation.plugin(OffCanvas, 'OffCanvas');
Foundation.plugin(Sticky, 'Sticky');
Foundation.addToJquery($);

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      menu: null,
      pages: null,
      events: null,
    }
  }

  componentDidMount() {
    async.parallel({
        pages: (callback) => {
          axios.get('/wp-json/wp/v2/pages')
            .then((response) => {
              callback(null, response.data);
            })
            .catch((err) => {
              callback(err)
            });
        },
        events: (callback) => {
          axios.get('/wp-json/wp/v2/events')
            .then((response) => {
              callback(null, response.data);
            })
            .catch((err) => {
              callback(err)
            });
        }
    }, (err, results) => {
      const events = results.events.sort((a, b) => {
        return moment(a.acf.date, 'M/D/YY h:mm a').isAfter(moment(b.acf.date, 'M/D/YY h:mm a'));
      });
      this.setState({
        loading: false,
        events,
        pages: results.pages
      });
    });
  }

  getEvent = (props) => {
    return this.state.events.filter(event =>
      event.slug === props.match.params.event
    ).pop();
  }

  getPage = (props) => {
    return this.state.pages.filter(page =>
      page.slug === props.match.params.slug
    ).pop();
  }

  render() {
    if (this.state.loading) {
      return (<Loader />);
    }
    return (
      <div>
        <Background pages={this.state.pages.concat(this.state.events)} />
        <div
          className="off-canvas position-left reveal-for-medium"
          data-off-canvas
          ref={(e) => { this.offCanvas = e; }}
        >
          <Menu
            events={this.state.events}
            pages={this.state.pages}
          />
        </div>
        <div
          className="off-canvas-content"
          data-off-canvas-content
        >
          <button
            type="button"
            className="menu-icon ccmc-menu__button show-for-small-only"
            onClick={() => {
              $(this.offCanvas).foundation('open');
            }}
          />
          <Switch>
              <Route
                path="/events/:event/map"
                render={props => <Map data={this.getEvent(props)} />}
              />
              <Route
                path="/events/:event/photos"
                render={props => <Photos data={this.getEvent(props)} />}
              />
              <Route
                path="/events/:event/video"
                render={props => <Video data={this.getEvent(props)} />}
              />
              <Route
                path="/events/:event/"
                render={props => <Event data={this.getEvent(props)} />}
              />
            <Route path="/events/:event/" component={Event} />
            <Route
              path="/events/"
              render={() => <Events events={this.state.events} />}
            />
            <Route path="/contact/" component={Contact} />
            <Route
              path="/:slug"
              render={props => <Page data={this.getPage(props)} />}
            />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default withRouter(App);
