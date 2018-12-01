import Web3 from 'web3';

const { NETWORK_ID, NETWORK_NAME } = process.env;

class Web3Connection {
  constructor() {
    this.initWeb3();
  }

  initWeb3() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      return true;
    }
    alert('Please install Metamask to use services');
    return false;
  }

  defaultAccount() {
    if (!this.web3) {
      return undefined;
    }
    return this.web3.eth.getAccounts()
      .then(accounts => accounts[0])
      .catch((e) => {
        console.log(e);
        return undefined;
      });
  }

  async checkWeb3Available() {
    const isWeb3Injected = !!window.web3;
    const currentAccount = await this.defaultAccount();
    if (isWeb3Injected && (typeof currentAccount !== 'undefined')) {
      if (!this.web3) {
        this.initWeb3();
      }

      const netId = await this.getNetwork();
      if (netId !== NETWORK_ID.toString()) {
        alert(`Metamask should be on ${NETWORK_NAME} network.`);
        return false;
      }
    }
    return true;
  }

  getNetwork() {
    return new Promise((resolve, reject) => {
      window.web3.version.getNetwork((err, netId) => {
        if (!err) {
          resolve(netId);
        }
        reject(netId);
      });
    });
  }
}

export default Web3Connection;
