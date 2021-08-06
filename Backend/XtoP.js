// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import fs from "fs";
import Avalanche from "avalanche";
import BinTools from "avalanche";

const ip = "localhost";
const port = 9650;
const protocol = "http";
const networkID = 1;
const avalancheInstance = new Avalanche(ip, port, protocol, networkID, "X", "C",);

const xKeyChain = avalancheInstance.XChain().keyChain();
const cKeyChain = avalancheInstance.CChain().keyChain();
const pKeyChain = avalancheInstance.PChain().keyChain();

async function main() {
    const pkey = JSON.parse(await fs.readFileSync("./data.json")).privateKey;
    xKeyChain.importKey(pkey);
    cKeyChain.importKey(pkey);
    pKeyChain.importKey(pkey);
}

main();

main.catch(error => {
    console.log("We got an error !:\n" + error);
})