import react, { Component } from 'react';
import { Grid, Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import getCampaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query; //destructuring from props.query
    const campaign = getCampaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();
    const contributorCount = await campaign.methods.contributorCount().call();

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, contributorCount };
  }

  renderRequests() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Aproval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{this.renderRows()}</Body>
      </Table>
    );
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          contributorCount={this.props.contributorCount}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <h3> Requests </h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button floated="right" style={{ marginBottom: 10 }} primary>
              Add request
            </Button>
          </a>
        </Link>
        {this.renderRequests()}
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
