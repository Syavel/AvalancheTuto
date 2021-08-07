// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import fs from "fs";
import Avalanche from "avalanche";
import BinTools from "avalanche";
import {UTXOSet} from "avalanche/dist/apis/evm/utxos";
import {Buffer} from "buffer";

const ip = "localhost";
const port = 9650;
const protocol = "http";
const networkID = 1;
const avalancheInstance = new Avalanche(ip, port, protocol, networkID, "X", "C", "P");

const xChain = avalancheInstance.XChain();
const xKeyChain = xChain.keyChain();
const xChainAddress = xKeyChain.getAddressStrings();

const cChain = avalancheInstance.CChain();
const cKeyChain = cChain.keyChain();
const cChainAddress = cKeyChain.getAddressStrings();

const pChain = avalancheInstance.PChain();
const pKeyChain = pChain.keyChain();
const pChainAddress = pKeyChain.getAddressStrings();

async function main() { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.

}

async function setup() {
    const pkey = JSON.parse(await fs.readFileSync("./data.json")).privateKey;
    xKeyChain.importKey(pkey);
    cKeyChain.importKey(pkey);
    pKeyChain.importKey(pkey);
}

async function start() {
    await setup();
    await main();
}

start();

main.catch(error => {
    console.log("We got an error !:\n" + error);
})