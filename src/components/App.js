import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import moment from 'moment';
import Home from './Home';
import Event from './Event';
import Loader from './Loader';

class App extends Component {

  state = {
    loading: true,
    pages: null,
    events: null,
    settings: null,
  }

  componentDidMount() {
    async.parallel({
        pages: cb => axios.get(`${process.env.REACT_APP_API_ENDPOINT}/wp/v2/pages`).then(data => cb(null, data)),
        events: cb => axios.get(`${process.env.REACT_APP_API_ENDPOINT}/wp/v2/events`).then(data => cb(null, data)),
        settings: cb => axios.get(`${process.env.REACT_APP_API_ENDPOINT}/ccmc/v1/settings`).then(data => cb(null, data)),
    }, (err, results) => {
      this.setState({
        loading: false,
        events: results.events.data,
        pages: results.pages.data,
        settings: results.settings.data,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (<Loader />);
    }
    return (
      <div>
        <Switch>
          <Route
            path="/events/:event/"
            render={routeProps => (
              <Event
                event={this.state.events.find(event =>
                  event.slug === routeProps.match.params.event
                )}
              />
            )}
          />
          <Route path="/" exact>
            <Home
              events={this.state.events}
              settings={this.state.settings}
              pages={this.state.pages}
            />
          </Route>
        </Switch>
      </div>
    );
  }

}

export default App;
