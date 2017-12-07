import React from 'react';
import { Button } from 'react-foundation';
import axios from 'axios';
import Loader from './Loader';

export default class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      csrfToken: '',
      details: null,
      loading: true,
    };
  }


  componentDidMount() {
    axios.get('/wp-json/ccmc/v1/settings')
      .then((response) => {
        this.setState({ details: response.data.contact, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  // @TODO: /wp-json/ccmc/v1/settings

  //
  // componentWillMount() {
  //   axios.get('/backend/rest/session/token')
  //     .then((response) => {
  //       const csrf_token = response.data;
  //       this.setState({'csrfToken': csrf_token});
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    // const self = this.state;
    // const node = {
    //   type: [{ target_id: 'article', target_type: 'node_type' }],
    //   title: [{ value: self.title }],
    //   body: [{ value: self.body }],
    // };
    // const config = {
    //   headers: { 'X-CSRF-Token': self.csrfToken },
    // };
    // axios.post('/backend/entity/node?_format=json', node, config)
    //   .then((success) => { console.log(success); this.props.onSubmit();})
    //   .catch((error) => { console.log(error);});
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <Loader />
          :
          <div className="grid-x grid-padding-x grid-padding-y align-middle">
            <div className="medium-6 cell">
              <div>Name: {this.state.details.name}</div>
              <div>Phone: {this.state.details.phone}</div>
              <div>Email: {this.state.details.email}</div>
            </div>
            <div className="medium-6 cell">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="title">Name:</label>
                  <input name="title" />
                </div>
                <div>
                  <label htmlFor="body">Body:</label>
                  <textarea name="body" />
                </div>
                <Button className="button large alert">Submit</Button>
              </form>
            </div>
          </div>
        }
      </div>
    );
  }

}
