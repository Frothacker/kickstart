import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';


class campaignNew extends Component {
  state = {
    minimumContribution: ''
  };

  onSubmit = (event) => {
    event.preventDefault();
    factory.methods.createCampaign(minimum).send({
      value:
    });
  };

  render() {
    return(
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit}>
          <Form.Field> 
            <label>Minimum Contribution</label>
            <Input 
              label="Wei" 
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })} 
            />
          </Form.Field>
          <Button primary> Create! </Button>
        </Form>
      </Layout>
    );
  }
}

export default campaignNew;