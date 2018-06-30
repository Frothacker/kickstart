import React, { Component } from 'react';
import Layout from '../../components/Layout';
import getCampaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // get campaign address from url stacked in routes
    const campaign = getCampaign(props.query.address);

    // get summary
    const summary = await campaign.methods.getSummary().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      campaignAddress: props.query.address
    };
  }

  renderCards() {
    const {
      minimumContribution: minimum,
      balance,
      requestsCount: requests,
      approversCount: approvers,
      manager
    } = this.props;
    const items = [
      {
        header: manager,
        meta: 'is the address of the manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimum,
        meta: 'Minimum Contribution (Wei)',
        description:
          'You must contribute at least ' +
          minimum +
          ' wei to become an approver'
      },
      {
        header: requests,
        meta: 'requests have been filed',
        description:
          'A request tried to withdraw money from the campaign. Requests must be approved by approvers'
      },
      {
        header: approvers,
        meta: 'people have donated to this campaign',
        description:
          'Number of approvers who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (Ether)',
        description: 'Amount of money this campaign has to spend'
      }
    ]; // end of items array
    return <Card.Group items={items} />;
  } // end of renderCards()

  render(props) {
    return (
      <Layout>
        <h3> Showing Campaign </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.campaignAddress} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                <a>
                  <Button primary> View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
