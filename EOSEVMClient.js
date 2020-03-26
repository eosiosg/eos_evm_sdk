const Eos_evm_sdk = require('./eos_evm_sdk')
const { RpcError } = require('eosjs')
const Web3 = require('web3')
const web3 = new Web3()

class EOSEVMClient extends Eos_evm_sdk {
  constructor (rpc, api, config, eos_account, eth_address, contract_dest) {
    super(rpc, api, config)
    this.eos_account = eos_account
    this.eth_address = eth_address
    this.contract_dest = contract_dest
  }

  async transfer (to, value, simulate) {
    try {
      let accountInfo = await this.getAccountByETH(this.eth_address)
      let useETHSign = accountInfo.eosio_account === ""

      return await this.sendRawAction(to, '', [], this.eth_address, simulate, 0, value, true, useETHSign)
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        return e.json.error.details[1].message.slice(pending_size)
      }
    }
  }

  async createAddress (eth_address) {
    if (!this.eos_account) {
      throw new Error("should create eos account first")
    }
    return await super.createETHAddress(this.eos_account, eth_address)
  }

  async deposit (quantity) {
    return super.depositToken(this.eos_account, quantity)
  }

  async withdraw (quantity) {
    return super.withdrawEOSToken(this.eos_account, quantity)
  }

  async getNonce () {
    const nonce = super.getSenderNonce(this.eth_address).then((nonce) => {return nonce})
    return web3.utils.hexToNumber(`0x${await nonce}`)
  }

  async getAllAccounts () {
    return super.getAllAccounts()
  }

  async getAccountInfoByETH () {
    return super.getAccountByETH(this.eth_address)
  }

  async getAccountInfoByEOS () {
    return super.getAccountByEOS(this.eos_account)
  }

  async getAssociateEOS () {
    return super.getAssociateEOSByETH(this.eth_address)
  }


  async getBalance () {
    return super.getBalanceByETH(this.eth_address)
  }

  async setContract (args, value = 0, nonce = 0) {
    return super.deployContract(this.eth_address, args, value, nonce)
  }

  /** Simple wrapper for ERC20
   * @method ERC20Transfer
   * @for  Eos_evm_sdk
   * @param {string} to: eth address
   * @param {int} amount
   * @param {boolean} simulate
   * */
  async ERC20Transfer (to, amount, simulate = false) {
    try {
      return await this.call(
        'transfer',
        [to, amount],
        simulate
      ).then(res => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        return e.json.error.details[1].message.slice(pending_size)
      }
    }
  }

  /** Simple wrapper for ERC20
   * @method ERC20BalanceOf: get current address balance
   * @for  Eos_evm_sdk
   * @param {boolean} simulate
   * */
  async ERC20BalanceOf (simulate = true) {
    try {
      return await this.call(
        'balanceOf',
        [this.eth_address],
        simulate
      ).then(res => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)

      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        let json_response = e.json.error.details[1].message.slice(pending_size)
        let balance = web3.utils.hexToNumber('0x' + JSON.parse(json_response).output)
        return `balance: ${balance}`
      }
    }
  }

  /** Simple wrapper for ERC20
   * @method ERC20TotalSupply: get current total supply
   * @for  Eos_evm_sdk
   * @param {boolean} simulate
   * */
  async ERC20TotalSupply (simulate = true) {
    try {
      return await this.call(
        'totalSupply',
        [],
        simulate
      ).then(res => {
        return web3.utils.hexToNumber(`0x${res.processed.action_traces[0].console.output}`)
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        let json_response = e.json.error.details[1].message.slice(pending_size)
        let total = web3.utils.hexToNumber('0x' + JSON.parse(json_response).output)
        return `total: ${total}`
      }
    }
  }

  async ERC20Symbol (simulate = true) {
    try {
      return await this.call(
        'symbol',
        [],
        simulate
      ).then(res => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        let json_response = e.json.error.details[1].message.slice(pending_size)
        let symbol = web3.utils.hexToUtf8('0x' + JSON.parse(json_response).output)
        return `symbol : ${symbol}`
      }
    }
  }

  async ERC20Decimals (simulate = true) {
    try {
      return await this.call(
        'decimals',
        [],
        simulate
      ).then(res => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        let json_response = e.json.error.details[1].message.slice(pending_size)
        let decimal = web3.utils.hexToNumber('0x' + JSON.parse(json_response).output)
        return `decimal: ${decimal}`
      }
    }
  }

  async ERC20Approve (spender, amount, simulate = false) {
    try {
      return await this.call(
        'approve',
        [spender, amount],
        simulate
      ).then(res => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        return e.json.error.details[1].message.slice(pending_size)
      }
    }
  }

  async ERC20Allowance (spender, simulate = true) {
    try {
      return await this.call(
        'allowance',
        [this.eth_address, spender],
        simulate
      ).then(res => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        let json_response = e.json.error.details[1].message.slice(pending_size)
        let allowance = web3.utils.hexToNumber('0x' + JSON.parse(json_response).output)
        return `allowance for spender ${spender} amount ${allowance}`
      }
    }
  }

  async ERC20TransferFrom (to, value, simulate = false) {
    try {
      return await this.call(
        'transferFrom',
        [this.eth_address, to, value],
        simulate
      ).then((res) => {
        return res.processed.action_traces[0].console
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e)
      if (e instanceof RpcError) {
        let pending_size = "pending console output: ".length
        return e.json.error.details[1].message.slice(pending_size)
      }
    }
  }

  async call (method,
              args,
              simulate = false,
              nonce = 0,
              value = 0,
              ethSign = true,
              gasPrice = this.config.defaultGasPrice,
              gasLimit = this.config.defaultGasLimit) {
    try {
      return await super.sendRawAction(
        this.contract_dest,
        method,
        args,
        this.eth_address,
        simulate,
        nonce,
        value,
        false,
        ethSign,
        gasPrice,
        gasLimit)
    } catch (e) {
      throw e
    }
  }

  async createContract (args,
                        simulate = false,
                        nonce = 0,
                        value = 0,
                        ethSign = true,
                        gasPrice = this.config.defaultGasPrice,
                        gasLimit = this.config.defaultGasLimit
  ) {
    return super.sendRawAction('', '', args, this.eth_address, simulate, nonce, value, false, ethSign, gasPrice, gasLimit)
  }

  async sendAction (method,
                    args,
                    simulate = false,
                    nonce = 0,
                    value = 0,
                    transfer = false,
                    ethSign = true,
                    gasPrice = this.config.defaultGasPrice,
                    gasLimit = this.config.defaultGasLimit) {
    return super.sendRawAction(this.contract_dest, method, args, this.eth_address, simulate, nonce, value, false, ethSign, gasPrice, gasLimit)
  }
}


module.exports = EOSEVMClient

