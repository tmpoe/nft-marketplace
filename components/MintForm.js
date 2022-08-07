import React, { Component } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";
import Market from "../src/chain/ethereum/market";
import web3 from "../src/chain/ethereum/web3";


class MintForm extends Component {
  state = {
    name: "",
    url: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    try{
        const market = Market("0xD79aD96386972832232D1E2EB292E20291be1cd4");

        console.log("MINTING")
        const accounts = await web3.eth.getAccounts();
        
        await market.methods.mint(this.state.name, this.state.url)
                            .send({from: accounts[0]});
        console.log("MINTED");

        
    }catch (err){
        console.error(err);
    }

  };

  render() {
    return (
    <Grid>
        <Grid.Column width={8}>
            <Form style={{marginLeft: "10px"}} onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Name of Nft</label>
                    <Input
                        value={this.state.name}
                        onChange={(event) => this.setState({ name: event.target.value })}
                        label="name"
                        labelPosition="right"
                    />
                </Form.Field>
                <Form.Field>
                    <label>IPFS url of image</label>
                    <Input
                        value={this.state.url}
                        onChange={(event) => this.setState({ url: event.target.value })}
                        label="ipfs url"
                        labelPosition="right"
                    />
                </Form.Field>
                <Button primary>
                    Mint!
                </Button>
            </Form>
        </Grid.Column>
    </Grid>
    
    );
    }
}

export default MintForm;
