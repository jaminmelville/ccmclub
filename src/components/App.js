import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import moment from 'moment';
import Home from './Home';
import Event from './Event';
import Loader from './Loader';
import Events from './Events';
import Contact from './Contact';
import Menu from './Menu';
import Page from './Page';

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

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading && (prevState.loading || prevProps.location !== this.props.location)) {
      if (this.props.location.hash === '') {
        document.documentElement.scrollTop = 0;
      } else {
        const scrollTop = document.getElementById(this.props.location.hash.replace('#', '')).getBoundingClientRect().top;
        document.documentElement.scrollTop = document.documentElement.scrollTop + scrollTop;
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loader />);
    }
    const pages = this.state.pages.map(page => <Page key={page.title.rendered} data={page} />);
    return (
      <>
        <Route path="/" exact>
          <Home
            events={this.state.events}
            settings={this.state.settings}
            pages={this.state.pages}
          />
        </Route>
        <Menu
          events={this.state.events}
          pages={this.state.pages}
        />
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
          <>
            <Events events={this.state.events} />
            {pages}
            <Contact
              contact={this.state.settings.contact}
            />
          </>
        </Route>
      </>
    );
  }

}

export default withRouter(App);