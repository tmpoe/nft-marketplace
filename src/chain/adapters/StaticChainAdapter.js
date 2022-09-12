import web3 from "../ethereum/web3";
import Market from "../ethereum/market";
import { marketplace } from "../dfinity/declarations/marketplace";
import DfinityAdapter from "./DfinityAdapter";
import EthereumAdapter from "./EthereumAdapter";

let ChainAdapter = null;

if (process.env.CHAIN_ENV === 'ethereum') {
    const market = Market(process.env.MARKET_ADDRESS);
    ChainAdapter = new EthereumAdapter(web3, market);
} else if (process.env.CHAIN_ENV === 'dfinity') {
    ChainAdapter = new DfinityAdapter(marketplace);
}

export default ChainAdapter;