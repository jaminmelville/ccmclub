/* eslint-disable */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
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
      this.setState({
        loading: false,
        events: results.events,
        pages: results.pages
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (<Background />);
    }
    return (
      <div>
        <Background pages={this.state.pages.concat(this.state.events)} />
        <div className="grid-container">
          <div className="grid-x grid-margin-x grid-margin-y align-middle page">
            <div className="medium-3 cell">
              <Menu
                events={this.state.events}
                pages={this.state.pages}
              />
            </div>
            <div className="medium-9 cell">
              <Switch>
                  <Route
                    path="/events/:event/map"
                    render={(props) => {
                      const event = this.state.events.filter(event =>
                        event.slug === props.match.params.event
                      ).pop();
                      return (<Map data={event} />);
                    }}
                  />
                  <Route
                    path="/events/:event/photos"
                    render={(props) => {
                      const event = this.state.events.filter(event =>
                        event.slug === props.match.params.event
                      ).pop();
                      return (<Photos data={event} />);
                    }}
                  />
                  <Route
                    path="/events/:event/video"
                    render={(props) => {
                      const event = this.state.events.filter(event =>
                        event.slug === props.match.params.event
                      ).pop();
                      return (<Video data={event} />);
                    }}
                  />
                  <Route
                    path="/events/:event/"
                    render={(props) => {
                      const event = this.state.events.filter(event =>
                        event.slug === props.match.params.event
                      ).pop();
                      return (<Event data={event} />);
                    }}
                  />
                <Route path="/events/:event/" component={Event} />
                <Route
                  path="/events/"
                  render={() => <Events events={this.state.events} />}
                />
                <Route path="/contact/" component={Contact} />
                <Route path="/" exact component={Home} />
                <Route path="/:slug" component={Page} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(App);
