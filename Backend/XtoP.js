// This script will be used to do the cross-chain transfer of the owner wallet from C to P chain and stake them
// to the user-chosen node.

import fs from "fs";

import {
  Avalanche,
  BinTools,
  BN,
  Buffer
 } from "avalanche"

const ip = "localhost";
const port = 9650;
const protocol = "http";
const networkID = 1;
const avalancheInstance = new Avalanche(ip, port, protocol, networkID, "X", "C",);

let xChain, cChain, pChain;
let xKeyChain, cKeyChain, pKeyChain;
let xChainAddress, cChainAddress, pChainAddress;
let xChainId, pChainId;

async function XtoP(amount) { //a C --> P cross-chain transfer doesn't exists, but C --> X, X --> P does.
    // C --> X
    let { utxosC } = await cChain.getUTXOs(cChainAddress);
    let CtoXTx = await xChain.buildExportTx(
        utxosC,
        new Avalanche.BN(amount),
        xChainId,
        cChainAddress,
        xChainAddress,
    )
    let signedCtoXTx = CtoXTx.sign(cKeyChain);
    await xChain.issueTx(signedCtoXTx);
    
    // X --> P
    
    let { utxosX } = await xChain.getUTXOs(cChainAddress);
    let XtoPTx = await cChain.buildExportTx(
        utxosX,
        new Avalanche.BN(amount),
        xChainId,
        xChainAddress,
        pChainAddress,
    )
    let signedXtoPTx = XtoPTx.sign(xKeyChain);
    await cChain.issueTx(signedXtoPTx);
}

async function setup() {
    xChain = avalancheInstance.XChain();
    xKeyChain = xChain.keyChain();
    xChainAddress = xKeyChain.getAddressStrings();
    cChain = avalancheInstance.CChain();
    cKeyChain = cChain.keyChain();
    cChainAddress = cKeyChain.getAddressStrings();
    pChain = avalancheInstance.PChain();
    pKeyChain = pChain.keyChain();
    pChainAddress = pKeyChain.getAddressStrings();
    const pkey = JSON.parse(await fs.readFileSync("./data.json")).privateKey;
    xKeyChain.importKey(pkey);
    cKeyChain.importKey(pkey);
    pKeyChain.importKey(pkey);
    xChainId = await avalancheInstance.Info().getBlockchainID("X");
    pChainId = await avalancheInstance.Info().getBlockchainID("P");
}

async function startStake(nodeID, amount) {
      const platformVMUTXOResponse: any = await pchain.getUTXOs(pAddressStrings)
  const utxoSet: UTXOSet = platformVMUTXOResponse.utxos
  const utxos: UTXO[] = utxoSet.getAllUTXOs()
  utxos.forEach((utxo: UTXO) => {
    const output: Output = utxo.getOutput()
    if (output.getOutputID() === 7) {
      const amountOutput: AmountOutput = utxo.getOutput() as AmountOutput
      const amt: BN = amountOutput.getAmount().clone()
      const txid: Buffer = utxo.getTxID()
      const outputidx: Buffer = utxo.getOutputIdx()

      const secpTransferInput: SECPTransferInput = new SECPTransferInput(amt)
      secpTransferInput.addSignatureIdx(0, pAddresses[0])

      const input: TransferableInput = new TransferableInput(
        txid,
        outputidx,
        avaxAssetID,
        secpTransferInput
      )
      inputs.push(input)
    }
  })

  const addDelegatorTx: AddDelegatorTx = new AddDelegatorTx(
    networkID,
    bintools.cb58Decode(pChainBlockchainID),
    outputs,
    inputs,
    memo,
    NodeIDStringToBuffer(nodeID),
    startTime,
    endTime,
    stakeAmount.minDelegatorStake,
    stakeOuts,
    rewardOwners
  )
}

async function crossChainAndStake(nodeID, amount) { // This function will be called from the UI later
    await XtoP(amount);
    await startStake(nodeID, amount);
}

crossChainAndStake();

main.catch(error => {
    console.log("We got an error !:\n" + error);
})