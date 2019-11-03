import React from 'react';
import axios from 'axios';
import Loader from './Loader';
import Content from './Content';

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
      <Content title="Contact">
        {this.state.loading ?
          <Loader />
          :
          <div className="grid-x align-center">
            <div className="cell small-12 medium-shrink contact__item">
              <i className="contact__icon fa fa-4x fa-user" />
              <span
                className="contact__value"
              >
                {this.state.details.name}
              </span>
            </div>
            <div className="cell small-12 medium-shrink contact__item">
              <i className="contact__icon fa fa-4x fa-mobile" />
              <a
                className="contact__value"
                href={`tel:${this.state.details.phone}`}
              >
                {this.state.details.phone}
              </a>
            </div>
            <div className="cell small-12 medium-shrink contact__item">
              <i className="contact__icon fa fa-4x fa-envelope" />
              <a
                className="contact__value"
                href={`mailto:${this.state.details.email}`}
              >
                email
              </a>
            </div>
          </div>
        }
      </Content>
    );
  }

}

/* <form onSubmit={this.handleSubmit}>
  <div className="medium-6 cell">
    <div>
      <label htmlFor="title">Name:</label>
      <input name="title" />
    </div>
    <div>
      <label htmlFor="body">Body:</label>
      <textarea name="body" />
    </div>
    <Button className="button large alert">Submit</Button>
  </div>
</form> */
