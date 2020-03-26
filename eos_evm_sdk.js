const fs = require("fs")
const Web3 = require('web3')
const web3 = new Web3()
const EthereumTx = require('ethereumjs-tx').Transaction


class Eos_evm_sdk {
  constructor (rpc, api, config) {
    this.api = api
    this.rpc = rpc
    this.config = config
    // load abi file from json
    this.abi = JSON.parse(fs.readFileSync(config.abiFile))
    this.source = JSON.parse(fs.readFileSync(config.sourceFile))
  }


  /** createETHAddress
   * @method createETHAccount
   * @for  Eos_evm_sdk
   * @param {string} eos_account
   * @param {string} eth_address optional
   * @return
   * create  EOS associate account or ETH account
   * 1. create EOS account, second param string is optional
   * 2. create ETH account, second param string must be native ETH address which user own the private key
   * */
  async createETHAddress (eos_account, eth_address) {
    eth_address = eth_address.slice(0, 2) === '0x' ? eth_address.slice(2) : eth_address
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'create',
          authorization: [{
            actor: eos_account,
            permission: 'active',
          }],
          data: {
            eos_account,
            eth_address
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      throw new Error(`${eos_account} create eth address exception ${eth_address}, ${e}`)
    }
  }

  /** linkToken
   * @method linkToken
   * @for  Eos_evm_sdk
   * @param {string} extended_symbol
   * link token first
   * */
  async linkToken (extended_symbol) {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'linktoken',
          authorization: [{
            actor: this.config.contract,
            permission: 'active',
          }],
          data: {
            'contract': extended_symbol
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      throw new Error(`${extended_symbol} link exception ${e}`)
    }
  }

  /** depositToken
   * @method depositToken
   * @for  Eos_evm_sdk
   * @param {string} from
   * @param {string} quantity
   * deposit EOS associate account quantity balance
   * transfer balance to evm contract address and will deposit balance to the associate EOSIO account address
   * */
  async depositToken (from, quantity) {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.tokenContract,
          name: 'transfer',
          authorization: [{
            actor: from,
            permission: 'active',
          }],
          data: {
            from: from,
            to: this.config.contract,
            quantity: quantity.toString(),
            memo: 'token deposit',
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      throw new Error(`${from} deposit ${quantity} token exception ${e}`)
    }
  }

  /** withdrawEOSToken
   * @method depositEOSToken
   * @for  Eos_evm_sdk
   * @param {string} eos_account
   * @param {string} quantity
   * withdraw EOS associate account quantity balance
   * withdraw balance from evm contract address and will withdraw balance to the associate EOSIO account
   * */
  async withdrawEOSToken (eos_account, quantity) {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'withdraw',
          authorization: [{
            actor: eos_account,
            permission: 'active',
          }],
          data: {
            eos_account,
            quantity
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      throw new Error(`${eos_account} withdraw ${quantity} token exception ${e}`)
    }
  }

  // 2. get encoded method ID from mapping method type and input
  getMethodObjFromABI (abi, method) {
    const abi_entry = abi.filter((item) => item.name === method)[0]
    if (typeof abi_entry === 'undefined') {
      throw "no such method in contract"
    }
    return abi_entry
  }

  getConstructorFromABI (abi) {
    const abi_entry = abi.filter((item) => item.type === 'constructor')[0]
    if (typeof abi_entry === 'undefined') {
      throw "no constructor in contract"
    }
    return abi_entry
  }

  /** validateArgs
   * @method
   * @for  Eos_evm_sdk
   * @param {array} abi_inputs
   * @param {array} args
   * withdraw balance from evm contract address and will withdraw balance to the associate EOSIO account
   * */
  validateArgs (abi_inputs, args) {
    /// TODO: need more function check
    return abi_inputs.length === args.length
  }

  /** getSenderNonce
   * @method:
   * @for  Eos_evm_sdk
   * @param {string} sender
   * retrive nonce from eos table to pack into raw trx code
   * */
  async getSenderNonce (sender) {
    sender = sender.slice(0, 2) === '0x' ? sender.slice(2) : sender
    const accountInfo = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      index_position: 2,
      key_type: 'sha256',
      lower_bound: '00'.repeat(12) + sender,
      limit: 1,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    if (!accountInfo.rows.length) {
      throw new Error(`no such account ${sender}`)
    }
    return accountInfo.rows[0].nonce
  }

  async getAllAccounts () {
    const accountList = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      limit: 100,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    return accountList.rows
  }

  async getAccountByETH (sender) {
    sender = sender.slice(0, 2) === '0x' ? sender.slice(2) : sender
    const accountInfo = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      index_position: 2,
      key_type: 'sha256',
      lower_bound: '00'.repeat(12) + sender,
      limit: 1,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    if (!accountInfo.rows.length) {
      throw new Error(`no such account ${sender}`)
    }
    return accountInfo.rows[0]
  }

  async getAssociateEOSByETH (sender) {
    sender = sender.slice(0, 2) === '0x' ? sender.slice(2) : sender
    const accountInfo = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      index_position: 2,
      key_type: 'sha256',
      lower_bound: '00'.repeat(12) + sender,
      limit: 1,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    if (!accountInfo.rows.length) {
      throw new Error(`no such account ${sender}`)
    }
    return accountInfo.rows[0].eosio_account
  }

  async getAccountByEOS (eos_account) {
    const accountInfo = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      index_position: 3,
      key_type: 'i64',
      lower_bound: eos_account,
      limit: 1,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    if (!accountInfo.rows.length) {
      throw new Error(`no such account ${eos_account}`)
    }
    return accountInfo.rows[0]
  }


  async sendRawEOSActionWithETHSIG (trxCode) {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'raw',
          authorization: [{
            actor: this.config.worker,
            permission: 'active',
          }],
          data: {
            "trx_code": trxCode,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      return e
    }
  }

  async sendSimulateEOSActionWithETHSIG (trxCode) {
    try {
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'simulate',
          authorization: [{
            actor: this.config.worker,
            permission: 'active',
          }],
          data: {
            "trx_code": trxCode,
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      throw e
    }
  }

  async sendRawEOSActionWithEOSSIG (trxCode, eth_sender, eos_sender) {
    try {
      eth_sender = eth_sender.slice(0, 2) === '0x' ? eth_sender.slice(2) : eth_sender
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'raw',
          authorization: [{
            actor: eos_sender,
            permission: 'active',
          }],
          data: {
            "trx_code": trxCode,
            "sender": eth_sender
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      return e
    }
  }

  async sendSimulateEOSActionWithEOSSIG (trxCode, eth_sender, eos_sender) {
    try {
      eth_sender = eth_sender.slice(0, 2) === '0x' ? eth_sender.slice(2) : eth_sender
      return await this.api.transact({
        actions: [{
          account: this.config.contract,
          name: 'simulate',
          authorization: [{
            actor: eos_sender,
            permission: 'active',
          }],
          data: {
            "trx_code": trxCode,
            "sender": eth_sender
          },
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      })
    } catch (e) {
      console.log('\nCaught exception: ' + e);
      if (e instanceof RpcError)
        console.log(e.json);
      // console.log(JSON.stringify(e.json, null, 2));
    }
  }

  async getBalanceByEOS (eos_account) {
    const accountInfo = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      index_position: 3,
      key_type: 'i64',
      lower_bound: eos_account,
      limit: 1,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    if (!accountInfo.rows.length) {
      throw new Error(`no such account ${eos_account}`)
    }
    return parseInt(accountInfo.rows[0].balance, 16) / Math.pow(10, 14)
  }

  async getBalanceByETH (eth_address) {
    eth_address = eth_address.slice(0, 2) === '0x' ? eth_address.slice(2) : eth_address
    const accountInfo = await this.rpc.get_table_rows({
      json: true,               // Get the response as json
      code: this.config.contract,      // Contract that we target
      scope: this.config.contract,         // Account that owns the data
      table: 'account',        // Table name
      index_position: 2,
      key_type: 'sha256',
      lower_bound: '00'.repeat(12) + eth_address,
      limit: 1,                // Maximum number of rows that we want to get
      reverse: false,           // Optional: Get reversed data
      show_payer: false          // Optional: Show ram payer
    })

    if (!accountInfo.rows.length) {
      throw new Error(`no such account ${eth_address}`)
    }
    return parseFloat((parseInt(accountInfo.rows[0].balance, 16) / Math.pow(10, 14)).toString()) / Math.pow(10, this.config.tokenPrecision)
  }

  /** deployContract
   * @method deployContract
   * @for  Eos_evm_sdk
   * @param {string} sender: transactor
   * @param {array} args: abi constructor array list i.e. [10000, 'first token', 4, 'SYS']
   * @param {boolean} simulate: if true simulate action
   * @param {boolean} ethSign: if true use ETH signature
   * @param {int} value: i.e: '27100'
   * @param {int} nonce
   * */
  async deployContract (sender, args, simulate=false, value = 0, nonce = 0, ethSign=true) {
    const actionParams = {
      to: '',
      method : '',
      args: args,
      sender: this.eth_address,
      simulate: simulate,
      nonce: nonce,
      value: value,
      transfer: false,
      ethSign: ethSign,
    }
    return await this.sendRawAction(...actionParams)
  }

  /** sendRawAction
   * @method sendRawAction
   * @for  Eos_evm_sdk
   * @param {string} to: eth_address, if no to address, action is CREATE_CONTRACT, if has to address, action is MESSAGE_CALL
   * @param {string} gasPrice: hex string i.e: '0x09184e72a000'
   * @param {string} gasLimit: hex string i.e: '0x27100'
   * @param {int} value: transfer value amount wei
   * @param {string} method: function signature need to be send
   * @param {array} args: function param need to be send
   * @param {string} sender: transactor, optional field
   * @param {int} nonce: nonce
   * @param {boolean} ethSign: if true use ETH sign else use EOS signature
   * @param {boolean} transfer: if true pure transfer
   * @param {boolean} simulate: whether this is a simulated action. If simulate is true, the transaction is forced to fail after execution; if simulate is false, the transaction is executed as it should be.
   * send raw transaction
   * there are three types of sending raw transaction
   * 1. create contract address
   * 2. execute vm code for certain evm address
   * 3. transfer balance
   * */
  async sendRawAction (to,
                       method,
                       args,
                       sender,
                       simulate = false,
                       nonce = 0,
                       value = 0,
                       transfer = false,
                       ethSign = true,
                       gasPrice = this.config.defaultGasPrice,
                       gasLimit = this.config.defaultGasLimit
  ) {
    // get private key if use eth sign
    let senderPrivateKey = ""
    if (sender in this.config.ethPrivateKeys && ethSign) {
      senderPrivateKey = this.config.ethPrivateKeys[sender]
    }

    let privateKey = Buffer.from(senderPrivateKey, 'hex',)

    const nonce_hex = nonce === 0 ? `0x${await this.getSenderNonce(sender.slice(2))}` : `0x${nonce.toString(16)}`

    const isCreateContract = to === ''

    // 1. Message Call encode method ID and type check
    let encodedData = ''
    if (!isCreateContract && !transfer) {
      const abi_entry = this.getMethodObjFromABI(this.abi, method)
      const func_signature_encode = web3.eth.abi.encodeFunctionSignature(abi_entry)

      this.validateArgs(abi_entry.inputs, args)
      let func_params_encode = web3.eth.abi.encodeParameters(abi_entry.inputs, args).slice(2)

      encodedData = func_signature_encode + func_params_encode
    } else if (isCreateContract) {
      // 2. deploy contract
      const abi_entry = this.getConstructorFromABI(this.abi)
      const constructor_params_encode = web3.eth.abi.encodeParameters(abi_entry.inputs, args).slice(2)

      encodedData = this.source.object + constructor_params_encode
      to = '0x'
    }

    let txParams = {
      nonce: nonce_hex,
      gasPrice: gasPrice === this.config.defaultGasPrice ? this.config.defaultGasPrice : `0x${parseInt(gasPrice, 10).toString(16)}`,
      gasLimit: gasLimit === this.config.defaultGasLimit ? this.config.defaultGasLimit : `0x${parseInt(gasLimit, 10).toString(16)}`,
      to: (to.slice(0, 2) === '0x' ? to : '0x' + to),
      value: `0x${value.toString(16)}`,
      data: encodedData.slice(0, 2) === '0x' ? encodedData : '0x' + encodedData,
    }

    // The second parameter is not necessary if these values are used
    let tx = new EthereumTx(txParams, { chain: 'mainnet', hardfork: 'istanbul' })

    if (ethSign) {
      tx.sign(privateKey)
    }
    let serializedTx = await tx.serialize().toString('hex')
    console.log(`serialized tx: ${serializedTx}`)

    let result
    // send eos transaction
    if (!simulate) {
      if (ethSign) {
        result = await this.sendRawEOSActionWithETHSIG(serializedTx)
      } else {
        let eos_sender = await this.getAssociateEOSByETH(sender)
        result = await this.sendRawEOSActionWithEOSSIG(serializedTx, sender, eos_sender)
      }
    } else  {
      if (ethSign) {
        result = await this.sendSimulateEOSActionWithETHSIG(serializedTx)
      } else {
        let eos_sender = await this.getAssociateEOSByETH(sender)
        result = await this.sendSimulateEOSActionWithEOSSIG(serializedTx, sender, eos_sender)
      }
    }

    return result
  }
}

module.exports = Eos_evm_sdk

