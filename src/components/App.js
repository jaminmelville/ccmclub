import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import async from 'async';
import Home from './Home';
import Event from './Event';
import Loader from './Loader';
import Events from './Events';
import Contact from './Contact';
import Menu from './Menu';
import Page from './Page';
import Sponsors from './Sponsors';

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
        sponsors: cb => axios.get(`${process.env.REACT_APP_API_ENDPOINT}/wp/v2/sponsors`).then(data => cb(null, data)),
        results: cb => axios.get(`${process.env.REACT_APP_API_ENDPOINT}/wp/v2/results`).then(data => cb(null, data)),
        settings: cb => axios.get(`${process.env.REACT_APP_API_ENDPOINT}/ccmc/v1/settings`).then(data => cb(null, data)),
    }, (err, results) => {
      const events = results.events.data.map(event => ({
        ...event,
        sponsors: results.sponsors.data.filter(sponsor => sponsor.acf.event === event.id),
        results: results.results.data
          .filter(result => result.acf.event === event.id)
          .map(result => ({
            id: result.acf.id,
            label: result.acf.label,
            url: result.acf.url,
          }))
          .sort((a, b) => b.label.localeCompare(a.label)),
      }));
      this.setState({
        loading: false,
        events,
        pages: results.pages.data,
        settings: results.settings.data,
        sponsors: results.sponsors.data,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.loading && (prevState.loading || prevProps.location !== this.props.location)) {
      if (this.props.location.hash === '') {
        document.documentElement.scrollTop = 0;
      } else {
        const element = document.getElementById(this.props.location.hash.replace('#', ''));
        if (element) {
          const scrollTop = element.getBoundingClientRect().top;
          document.documentElement.scrollTop = document.documentElement.scrollTop + scrollTop;
        }
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (<Loader />);
    }
    const pages = this.state.pages.map(page => <Page key={page.title.rendered} data={page} />);
    const menuItems = [
      {
        name: 'Home',
        url: '/' },
      {
        name: 'Events',
        url: '/#events',
      },
    ];
    this.state.pages.forEach((item) => {
      menuItems.push({
        name: item.title.rendered,
        url: `/#${item.slug}`,
      });
    });
    menuItems.push({
      name: 'Contact',
      url: '/#contact',
    });
    const featuredSponsors = this.state.sponsors.filter(sponsor => sponsor.acf.show_on_home_page);
    return (
      <>
        <Route path="/" exact>
          <Home settings={this.state.settings} />
        </Route>
        <Menu
          items={menuItems}
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
            <Sponsors
              sponsors={featuredSponsors}
            />
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
