import logo from './logo.svg';
import React from 'react';
import './App.css';
import Web3 from 'web3';

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalAMount",
				"type": "uint256"
			}
		],
		"name": "Redeem",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalAMount",
				"type": "uint256"
			}
		],
		"name": "StakeEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakeId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "currentStakedByUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minimumValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "stakeId",
				"type": "uint256"
			}
		],
		"name": "redeem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "secondsInFuture",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "stakeNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakeds",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "stakeId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "finalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endingTimestamp",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "updated",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "redeemed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "stakeId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "finalAmount",
				"type": "uint256"
			}
		],
		"name": "updateStake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "secondsF",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minimum",
				"type": "uint256"
			}
		],
		"name": "updateVariables",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const win = window
var nid
const connectMetamask = () => {
  if (win.ethereum) {
    win.web3 = new Web3(win.ethereum);
    win.ethereum.enable();
    nid = getNetworkId()
  }
}

const getNetworkId = () => {
  const networks = new Map();
  networks.set(97, "BSC Testnet")
  networks.set(56, "Binance Smart Chain")
  networks.set(43114, "Avalanche")
  networks.set(43113, "Fuji Testnet")
  return "Network : " + networks.get(parseInt(win.ethereum.chainId));
}

const Toggle = () => {
  const [show, toggleShow] = React.useState(true);

  return (
    <div>
      { show &&
      <button onClick={() => {
          connectMetamask();
          toggleShow();
        }}
      >
      {show && <svg width="32" height="32" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.494 1L18.9615 10.8878L21.2921 5.0606L31.494 1Z" fill="#E17726" stroke="#E17726" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.58691 1L15.0078 10.9801L12.7889 5.06059L2.58691 1Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M26.9816 23.9258L23.6471 29.3575L30.7872 31.4537L32.8326 24.0445L26.9816 23.9258Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.26001 24.0445L3.29296 31.4537L10.4207 29.3575L7.09856 23.9258L1.26001 24.0445Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.0367 14.7505L8.05334 17.941L15.1191 18.2838L14.8836 10.1758L10.0367 14.7505Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24.0439 14.751L19.1227 10.084L18.9615 18.2843L26.0273 17.9415L24.0439 14.751Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.4211 29.3579L14.6977 27.1563L11.0162 24.0977L10.4211 29.3579Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.3835 27.1563L23.6477 29.3579L23.0651 24.0977L19.3835 27.1563Z" fill="#E27625" stroke="#E27625" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.6477 29.3579L19.3835 27.1562L19.7306 30.1094L19.6934 31.3618L23.6477 29.3579Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.4211 29.3579L14.3879 31.3618L14.3631 30.1094L14.6977 27.1562L10.4211 29.3579Z" fill="#D5BFB2" stroke="#D5BFB2" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.4621 22.146L10.9167 21.0386L13.4207 19.8125L14.4621 22.146Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6189 22.146L20.6602 19.8125L23.1766 21.0386L19.6189 22.146Z" fill="#233447" stroke="#233447" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.4206 29.3575L11.0405 23.9258L7.09851 24.0445L10.4206 29.3575Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.0403 23.9258L23.6477 29.3575L26.9822 24.0445L23.0403 23.9258Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M26.0273 17.9414L18.9615 18.2842L19.6185 22.1471L20.6598 19.8135L23.1762 21.0396L26.0273 17.9414Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.9168 21.0396L13.4208 19.8135L14.4621 22.1471L15.1191 18.2842L8.05334 17.9414L10.9168 21.0396Z" fill="#CC6228" stroke="#CC6228" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.05334 17.9414L11.016 24.0983L10.9168 21.0396L8.05334 17.9414Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23.1765 21.0396L23.0649 24.0983L26.0276 17.9414L23.1765 21.0396Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.1193 18.2832L14.4623 22.1461L15.2928 26.7076L15.4788 20.6959L15.1193 18.2832Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.9618 18.2832L18.6146 20.6827L18.7882 26.7076L19.6187 22.1461L18.9618 18.2832Z" fill="#E27525" stroke="#E27525" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6186 22.1465L18.7881 26.708L19.3831 27.1563L23.0648 24.0977L23.1763 21.0391L19.6186 22.1465Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.9167 21.0391L11.016 24.0977L14.6976 27.1563L15.2926 26.708L14.4621 22.1465L10.9167 21.0391Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.6934 31.3614L19.7305 30.1089L19.4083 29.8188H14.673L14.3631 30.1089L14.3879 31.3614L10.4211 29.3574L11.8095 30.5703L14.6234 32.6402H19.4454L22.2718 30.5703L23.6477 29.3574L19.6934 31.3614Z" fill="#C0AC9D" stroke="#C0AC9D" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.3833 27.1572L18.7883 26.709H15.2926L14.6976 27.1572L14.3629 30.1104L14.6728 29.8203H19.4081L19.7304 30.1104L19.3833 27.1572Z" fill="#161616" stroke="#161616" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M32.0275 11.5338L33.0812 6.07574L31.4945 1L19.3835 10.5583L24.0444 14.7506L30.6267 16.7942L32.0771 14.988L31.4449 14.5001L32.4489 13.5246L31.6804 12.8918L32.6845 12.0743L32.0275 11.5338Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 6.07574L2.06606 11.5338L1.38428 12.0743L2.40076 12.8918L1.6322 13.5246L2.63628 14.5001L2.00408 14.988L3.45443 16.7942L10.0368 14.7506L14.6976 10.5583L2.5867 1L1 6.07574Z" fill="#763E1A" stroke="#763E1A" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M30.6265 16.7934L24.0442 14.75L26.0276 17.9405L23.0649 24.0972L26.9821 24.0445H32.833L30.6265 16.7934Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.0364 14.75L3.45411 16.7934L1.26001 24.0445H7.09856L11.0157 24.0972L8.05306 17.9405L10.0364 14.75Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.9616 18.2839L19.3831 10.5581L21.292 5.06055H12.7883L14.6973 10.5581L15.1188 18.2839L15.2799 20.7096L15.2923 26.7083H18.788L18.8004 20.7096L18.9616 18.2839Z" fill="#F5841F" stroke="#F5841F" stroke-width="0.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>}
      </button>    
      
  }
  {!show && <div className="network">{nid}</div>}
    </div>
  )
}

const stake = async () => {
  var contract = new win.web3.eth.Contract(abi, "0xA435cE9134e5FAdE32EF07fbeD407426F82962ef")
  var timestamp = parseInt(Date.now()/1000)+20*24*3600
  var value = parseInt(document.getElementById("balance").value * 10**18)
  var address = await win.web3.eth.getAccounts()
  const gas = await contract.methods.stake(timestamp).estimateGas({from:address[0], gasPrice:225*10**9, value:value});
  await contract.methods.stake(timestamp).send({from:address[0], gasPrice:225*10**9, value:value, gas:gas});
}
const max = async () => {
  var address = await win.web3.eth.getAccounts()
  var balance = await win.web3.eth.getBalance(address[0]);
  document.getElementById("balance").value = balance/10**18;

}

function App() {
  return (
    <div className="App">
      <div className="connect">
        <header className='header'>
          <Toggle/>
        </header>
      </div>
      <div className="stake">
        <div className="stake-inside">
          <div className="stake2">
            <input id="balance" placeholder="0.00" type="number" className="sc-jcwpoC htmXgq"/>
            <button className="sc-hBMUJo sc-bkbkJK sc-carFqZ eYMdgl dwdOKO foYllf" onClick={max}>Max</button>
            <img width="32" height="32" src="https://explorer.avax.network/img/avax_icon_circle.png" alt="1INCH" className="sc-hiKfDv bCRyju"></img>
            <span size="16" color="tertiary" className="sc-bdnxRM cGPUwk">AVAX</span>

          </div>
        </div>
      </div>
      <div className="sc-hKFxyN sc-jSFjdj sc-gGLxEB fHvbEq jwJITU dGJRan"><button onClick={stake} width="100%" className="sc-hBMUJo sc-fnVZcZ dSGuVp dQOoaS">Stake</button></div>
    </div>
  );
}

export default App;
