import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

import EthereumAdapter from "../src/chain/adapters/EthereumAdapter";

import Layout from "../components/Layout";
import { Link } from "../routes";
import { getIpfsUrlFromHash } from "../src/utils";
import market from "../src/chain/ethereum/market";

const ChainAdapter = EthereumAdapter;

class MarketplaceIndex extends Component {

  static async getInitialProps(props) {

    const nfts = await ChainAdapter.getNftList(process.env.MARKET_ADDRESS);

    return {
      nfts: nfts
    };
  }

  renderNftPreview() {
    const nfts = this.props.nfts;
    const toShowCase = nfts.slice(-3);

    const cardItems = toShowCase.map((nft) => {
      return {
        header: nft.name,
        description: (
          <Link route={`/nft/${nft.address}`}>
            <a>Details</a>
          </Link>),
        image: getIpfsUrlFromHash(nft.ipfsHash),
      }
    });
    return <Card.Group centered items={cardItems}/>;
  }

  render() {
    return(
      <Layout>
        {this.renderNftPreview()}
      </Layout>
      
    );
  }
}

export default MarketplaceIndex;