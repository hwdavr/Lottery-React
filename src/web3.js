// import web3 to replace the default web3 injected by MetaMask < 1.0.0
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);

export default web3;