import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Content from './Content';

export default class Contact extends React.Component {

  state = {
    title: '',
    body: '',
    csrfToken: '',
    details: null,
  };

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
      <Content
        id="contact"
        title="Contact"
        background="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/contact.jpg"
      >
          <div className="grid-x align-center">
            <div className="cell small-12 medium-shrink contact__item">
              <FontAwesomeIcon className="contact__icon" size="4x" icon={faUser} />
              <span
                className="contact__value"
              >
                {this.props.contact.name}
              </span>
            </div>
            <div className="cell small-12 medium-shrink contact__item">
              <FontAwesomeIcon className="contact__icon" size="4x" icon={faMobile} />
              <a
                className="contact__value"
                href={`tel:${this.props.contact.phone}`}
              >
                {this.props.contact.phone}
              </a>
            </div>
            <div className="cell small-12 medium-shrink contact__item">
              <FontAwesomeIcon className="contact__icon" size="4x" icon={faEnvelope} />
              <a
                className="contact__value"
                href={`mailto:${this.props.contact.email}`}
              >
                email
              </a>
            </div>
          </div>
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
