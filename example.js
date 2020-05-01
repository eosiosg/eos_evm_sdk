const Eos_evm_sdk = require('./eos_evm_sdk')
const { Api, JsonRpc, RpcError } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')      // development only

const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')                   // node only; native TextEncoder/Decoder

const EOSEVMClient = require('./EOSEVMClient')

const defaultPrivateKey = "5KMgea7s31sAAj8pEZeKmZXvzSo6spxtwmfUibckVmNwN7e44d4" // bob
const akey = "5KMgea7s31sAAj8pEZeKmZXvzSo6spxtwmfUibckVmNwN7e44d4" // eosevm111111
const bkey = "5KMgea7s31sAAj8pEZeKmZXvzSo6spxtwmfUibckVmNwN7e44d4" // eosevm11111b
const ckey = "5KMgea7s31sAAj8pEZeKmZXvzSo6spxtwmfUibckVmNwN7e44d4" // eosevm11111c
const dkey = "5KMgea7s31sAAj8pEZeKmZXvzSo6spxtwmfUibckVmNwN7e44d4" // eosevm11111d
const fkey = "5KMgea7s31sAAj8pEZeKmZXvzSo6spxtwmfUibckVmNwN7e44d4" // eosevm11111d

const signatureProvider = new JsSignatureProvider([defaultPrivateKey, akey, bkey, ckey, dkey, fkey])

const env = 'local'
let config = {}

if (env === "mainnet") {

} else if (env === 'jungle') {
  config = {
    chainid: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    endpoint: 'http://jungle2.cryptolions.io:80',
    contract: 'eosevm111111',
    tokenContract: 'eosio.token',
    tokenPrecision: 4,
    tokenSymbol: 'SYS',
    worker: 'eosevm11111d',
    ethPrivateKeys: {
      /// address : privateKey
      '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6': 'cbb1981be330b0d97e620a61b913f678fc9c12c059a70badf92d0db317ff804f',
      '0x39944247c2edf660d86d57764b58d83b8eee9014': '3f04415249414ff900b464f8d588517146c4ec39a3ae9855282030fa3de3862f',
      '0xe327e755438fbdf9e60891d9b752da10a38514d1': '9089c365c66ca5d1ea63f1a42a569326d887e680b2256fe79897a2da5aa708ea'
    },
    eosPrivateKeys: {
      'eosevm111111': akey,
      'eosevm11111b': bkey,
      'eosevm11111c': ckey,
      'eosevm11111d': dkey,
      'eosevm11111f': fkey
    },
    abiFile: './ERC20/ERC20.json',
    sourceFile: './ERC20/ERC20ByteCode.json',
    EOSWasmFilePath: './EOSEVMContract/eos_evm.wasm',
    EOSAbiFilePath: './EOSEVMContract/eos_evm.abi',
    defaultGasPrice: '0x01',
    defaultGasLimit: '0x0f4240'
  }
} else if (env === 'local') {
  config = {
    chainid: '09c39d2fc860330acd4842a847a2a47228a3077257372b82845128b0bf90f53b',
    endpoint: 'http://127.0.0.1:8888',
    contract: 'eosevm111111',
    tokenContract: 'eosio.token',
    tokenPrecision: 4,
    tokenSymbol: 'SYS',
    worker: 'eosevm11111d',
    ethPrivateKeys: {
      /// address : privateKey
      '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6': 'cbb1981be330b0d97e620a61b913f678fc9c12c059a70badf92d0db317ff804f',
      '0x39944247c2edf660d86d57764b58d83b8eee9014': '3f04415249414ff900b464f8d588517146c4ec39a3ae9855282030fa3de3862f',
      '0xe327e755438fbdf9e60891d9b752da10a38514d1': '9089c365c66ca5d1ea63f1a42a569326d887e680b2256fe79897a2da5aa708ea'
    },
    eosPrivateKeys: {
      'eosevm111111': akey,
      'eosevm11111b': bkey,
      'eosevm11111c': ckey,
      'eosevm11111d': dkey,
      'eosevm11111f': fkey
    },
    abiFile: './ERC20/ERC20.json',
    sourceFile: './ERC20/ERC20ByteCode.json',
    EOSWasmFilePath: './EOSEVMContract/eos_evm.wasm',
    EOSAbiFilePath: './EOSEVMContract/eos_evm.abi',
    defaultGasPrice: '0x01',
    defaultGasLimit: '0x0f4240'
  }
}

const rpc = new JsonRpc(config.endpoint, { fetch })

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main () {
  /**
   * example code
   * */
  const accountb = 'eosevm11111b'
  const accountc = 'eosevm11111c'
  const accountd = 'eosevm11111d'
  const eos_non_associate_eth_address_b = '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6'
  const eos_non_associate_eth_address_c = '0x39944247c2edf660d86d57764b58d83b8eee9014'
  const eos_non_associate_eth_address_d = '0xe327e755438fbdf9e60891d9b752da10a38514d1'
  const eos_associate_eth_address_b = '0xf3c855f2988f7eabc4b4352bc5980825ebd8c3ef'

  const eos_evm_sdk = new Eos_evm_sdk(rpc, api, config)

  console.log('------------------------------ set contract address ------------------------------')
  await eos_evm_sdk.setContract().then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ link token  ------------------------------')
  await eos_evm_sdk.linkToken(4, 'SYS', 'eosio.token').then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ update auth ------------------------------')
  await eos_evm_sdk.updateAuth().then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ create ETH address ------------------------------')
  let account_eos_evm_b = new EOSEVMClient(rpc, api, config, accountb, '', '')
  // create associate EOS account ETH address
  await account_eos_evm_b.createAddress('aaaaaa').then((res) => console.log(res))
  // create eos_non_associate ETH address
  await account_eos_evm_b.createAddress(eos_non_associate_eth_address_b.slice(2)).then((res) => console.log(res))

  let account_eos_evm_c = new EOSEVMClient(rpc, api, config, accountc, '', '')
  // create associate EOS account ETH address
  await account_eos_evm_c.createAddress('aaaaaa').then((res) => console.log(res))
  // create eos_non_associate ETH address
  await account_eos_evm_c.createAddress(eos_non_associate_eth_address_c.slice(2)).then((res) => console.log(res))

  let account_eos_evm_d = new EOSEVMClient(rpc, api, config, accountd, '', '')
  // create associate EOS account ETH address
  await account_eos_evm_d.createAddress('aaaaaa').then((res) => console.log(res))
  // create eos_non_associate ETH address
  await account_eos_evm_d.createAddress(eos_non_associate_eth_address_d.slice(2)).then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ get all ETH address ------------------------------')
  await account_eos_evm_c.getAllAccounts().then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')


  await sleep(1000)
  console.log('------------------------------ create ERC20 ETH contract ------------------------------')
  let account_eosevm11111b_create_contract = new EOSEVMClient(rpc, api, config, '', eos_non_associate_eth_address_b, '')
  let contract_address = ''
  await account_eosevm11111b_create_contract.createContract([100000, 'first token', 4, 'ERC']).then(
    res => {
      contract_address = `0x` + JSON.parse(res.processed.action_traces[0].console)["create address"]
      console.log(`contract address: ${contract_address}`)
    }
  )
  console.log('----------------------------------------------------------------------------------')

  ///('------------------------------ construct ETH address object ------------------------------')
  const account_eosevm11111b_eos_associate = new EOSEVMClient(rpc, api, config, accountb, eos_associate_eth_address_b, contract_address)
  const account_eosevm11111b_eos_non_associate_eth = new EOSEVMClient(rpc, api, config, '', eos_non_associate_eth_address_b, contract_address)

  const account_eosevm11111c_eos_non_associate_eth = new EOSEVMClient(rpc, api, config, '', eos_non_associate_eth_address_c, contract_address)

  const account_eosevm11111d_eos_non_associate_eth = new EOSEVMClient(rpc, api, config, '', eos_non_associate_eth_address_d, contract_address)

  let symbol = ''
  let precision = 0
  await account_eosevm11111b_eos_non_associate_eth.ERC20Symbol().then(sym => {
    symbol = sym
  })
  await account_eosevm11111b_eos_non_associate_eth.ERC20Decimals().then(pre => {
    precision = pre
  })

  await sleep(1000)

  console.log('------------------------------ ERC20 token transfer from eos_non_associate_eth_address_b to  eos_non_associate_eth_address_c ------------------------------')

  let before_balanceof_eos_non_associate_eth_address_b = 0
  await account_eosevm11111b_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_b = `${balance} ${symbol}`
  })

  let before_balanceof_eos_non_associate_eth_address_c = 0
  await account_eosevm11111c_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_c = `${balance} ${symbol}`
  })

  await account_eosevm11111b_eos_non_associate_eth.ERC20Transfer(eos_non_associate_eth_address_c, 0.01).then(
    res => console.log(res)
  )
  await sleep(1000)

  let after_balanceof_eos_non_associate_eth_address_b = 0
  await account_eosevm11111b_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    after_balanceof_eos_non_associate_eth_address_b = `${balance} ${symbol}`
  })

  let after_balanceof_eos_non_associate_eth_address_c = 0
  await account_eosevm11111c_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    after_balanceof_eos_non_associate_eth_address_c = `${balance} ${symbol}`
  })

  console.log('------------------------------ ERC20 transfer state change summary ------------------------------')
  console.log(`ERC20 token transfer from eos_non_associate_eth_address_b to  eos_non_associate_eth_address_c 0.0010 ERC`)
  console.log(`before ERC20 balanceof_eos_non_associate_eth_address_b: ${before_balanceof_eos_non_associate_eth_address_b}`)
  console.log(`after ERC20 balanceof_eos_non_associate_eth_address_b: ${after_balanceof_eos_non_associate_eth_address_b}`)
  console.log(`before ERC20 balanceof_eos_non_associate_eth_address_c: ${before_balanceof_eos_non_associate_eth_address_c}`)
  console.log(`after ERC20 balanceof_eos_non_associate_eth_address_c: ${after_balanceof_eos_non_associate_eth_address_c}`)


  console.log('------------------------------ ERC20 token transfer from eos_non_associate_eth_address_b to  eos_non_associate_eth_address_d ------------------------------')

  before_balanceof_eos_non_associate_eth_address_b = 0
  await account_eosevm11111b_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_b = `${balance} ${symbol}`
  })

  let before_balanceof_eos_non_associate_eth_address_d = 0
  await account_eosevm11111d_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_d = `${balance} ${symbol}`
  })

  await account_eosevm11111b_eos_non_associate_eth.ERC20Transfer(eos_non_associate_eth_address_d, 0.05).then(
    res => console.log(res)
  )

  after_balanceof_eos_non_associate_eth_address_b = 0
  await account_eosevm11111b_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_b = `${balance} ${symbol}`
  })

  let after_balanceof_eos_non_associate_eth_address_d = 0
  await account_eosevm11111d_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    after_balanceof_eos_non_associate_eth_address_d = `${balance} ${symbol}`
  })

  console.log('------------------------------ ERC20 transfer state change summary ------------------------------')
  console.log(`ERC20 token transfer from eos_non_associate_eth_address_b to  eos_non_associate_eth_address_c 0.0010 ERC`)
  console.log(`before ERC20 balanceof_eos_non_associate_eth_address_b: ${before_balanceof_eos_non_associate_eth_address_b}`)
  console.log(`after ERC20 balanceof_eos_non_associate_eth_address_b: ${after_balanceof_eos_non_associate_eth_address_b}`)
  console.log(`before ERC20 balanceof_eos_non_associate_eth_address_d: ${before_balanceof_eos_non_associate_eth_address_d}`)
  console.log(`after ERC20 balanceof_eos_non_associate_eth_address_d: ${after_balanceof_eos_non_associate_eth_address_d}`)

  await sleep(1000)

  console.log('------------------------------ ERC20 token Approve ------------------------------')
  await account_eosevm11111d_eos_non_associate_eth.ERC20Approve(eos_non_associate_eth_address_c, 0.02).then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ ERC20 token allowance ------------------------------')
  await account_eosevm11111d_eos_non_associate_eth.ERC20Allowance(eos_non_associate_eth_address_c).then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')
  await sleep(1000)

  console.log('------------------------------ ERC20 token transfer from eos_non_associate_eth_address_d to eos_non_associate_eth_address_c ------------------------------')

  before_balanceof_eos_non_associate_eth_address_c = 0
  await account_eosevm11111c_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_c = `${balance} ${symbol}`
  })

  before_balanceof_eos_non_associate_eth_address_d = 0
  await account_eosevm11111d_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    before_balanceof_eos_non_associate_eth_address_d = `${balance} ${symbol}`
  })

  await account_eosevm11111c_eos_non_associate_eth.ERC20TransferFrom(eos_non_associate_eth_address_d,
    eos_non_associate_eth_address_c, 0.002).then(res => console.log(res))

  after_balanceof_eos_non_associate_eth_address_c = 0
  await account_eosevm11111c_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    after_balanceof_eos_non_associate_eth_address_c = `${balance} ${symbol}`
  })

  after_balanceof_eos_non_associate_eth_address_d = 0
  await account_eosevm11111d_eos_non_associate_eth.ERC20BalanceOf().then(balance => {
    balance = parseFloat(balance) / Math.pow(10, precision)
    after_balanceof_eos_non_associate_eth_address_d = `${balance} ${symbol}`
  })

  console.log('------------------------------ ERC20 transfer from state change summary ------------------------------')
  console.log(`ERC20 token transfer from eos_non_associate_eth_address_d to eos_non_associate_eth_address_c 0.002 ERC`)
  console.log(`before ERC20 balanceof_eos_non_associate_eth_address_c: ${before_balanceof_eos_non_associate_eth_address_c}`)
  console.log(`after ERC20 balanceof_eos_non_associate_eth_address_c: ${after_balanceof_eos_non_associate_eth_address_c}`)
  console.log(`before ERC20 balanceof_eos_non_associate_eth_address_d: ${before_balanceof_eos_non_associate_eth_address_d}`)
  console.log(`after ERC20 balanceof_eos_non_associate_eth_address_d: ${after_balanceof_eos_non_associate_eth_address_d}`)

  await sleep(1000)

  console.log('------------------------------ deposit ------------------------------')
  let before_eos_associate_eth_address_b_balance = 0
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => {
    before_eos_associate_eth_address_b_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  let before_deposit_balance = 0
  await rpc.get_currency_balance(config.tokenContract, accountb, config.tokenSymbol).then((balance) => {
    before_deposit_balance = balance
  })
  await account_eosevm11111b_eos_associate.deposit('0.0010 SYS').then((res) => console.log(res))

  let after_deposit_balance = 0
  await rpc.get_currency_balance(config.tokenContract, accountb, config.tokenSymbol).then((balance) => {
    after_deposit_balance = balance
  })

  let after_eos_associate_eth_address_b_balance = 0
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => {
    after_eos_associate_eth_address_b_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  console.log('------------------------------ deposit state change summary ------------------------------')
  console.log(`deposit 0.0010 SYS`)
  console.log(`before deposit get balance eos_associate_eth_address_b: ${before_eos_associate_eth_address_b_balance}`)
  console.log(`after deposit get balance eos_associate_eth_address_b: ${after_eos_associate_eth_address_b_balance}`)
  console.log(`before deposit get eosio.token balance accountb: ${before_deposit_balance}`)
  console.log(`after deposit get eosio.token balance accountb: ${after_deposit_balance}`)


  console.log('------------------------------account_eosevm11111b_eos_associate transfer 1 WEI  eos_non_associate_eth_address_c------------------------------')
  before_eos_associate_eth_address_b_balance = 0
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => {
    before_eos_associate_eth_address_b_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  let before_eos_non_associate_eth_address_c_balance = 0
  await account_eosevm11111c_eos_non_associate_eth.getBalance().then((balance) => {
    before_eos_non_associate_eth_address_c_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })
  await account_eosevm11111b_eos_associate.transfer(eos_non_associate_eth_address_c, 1).then((res) => console.log(res))

  after_eos_associate_eth_address_b_balance = 0
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => {
    after_eos_associate_eth_address_b_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  let after_eos_non_associate_eth_address_c_balance = 0
  await account_eosevm11111c_eos_non_associate_eth.getBalance().then((balance) => {
    after_eos_non_associate_eth_address_c_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  console.log('------------------------------ transfer state change summary ------------------------------')
  console.log(`transfer 1 WEI`)
  console.log(`before transfer get balance eos_associate_eth_address_b: ${before_eos_associate_eth_address_b_balance}`)
  console.log(`after transfer get balance eos_associate_eth_address_b: ${after_eos_associate_eth_address_b_balance}`)
  console.log(`before transfer get balance eos_non_associate_eth_address_c: ${before_eos_non_associate_eth_address_c_balance}`)
  console.log(`after transfer get balance eos_non_associate_eth_address_c: ${after_eos_non_associate_eth_address_c_balance}`)


  console.log('------------------------------ withdraw ------------------------------')
  let before_withdraw_eos_associate_eth_address_b_balance = 0
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => {
    before_withdraw_eos_associate_eth_address_b_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  let before_withdraw_eosiotoken_accountb_balance = 0
  await rpc.get_currency_balance(config.tokenContract, accountb, config.tokenSymbol).then((balance) => {
    before_withdraw_eosiotoken_accountb_balance = balance
  })

  await account_eosevm11111b_eos_associate.withdraw('0.0001 SYS').then((res) => console.log(res))

  let after_withdraw_eos_associate_eth_address_b_balance = 0
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => {
    after_withdraw_eos_associate_eth_address_b_balance = `${parseFloat(balance / Math.pow(10, 18)).toString()} ${config.tokenSymbol}`
  })

  let after_withdraw_eosiotoken_accountb_balance = 0
  await rpc.get_currency_balance(config.tokenContract, accountb, config.tokenSymbol).then((balance) => {
    after_withdraw_eosiotoken_accountb_balance = balance
  })

  console.log('------------------------------ withdraw state change summary ------------------------------')
  console.log(`withdraw 0.0001 SYS`)
  console.log(`before transfer get balance eos_associate_eth_address_b: ${before_withdraw_eos_associate_eth_address_b_balance}`)
  console.log(`after transfer get balance eos_associate_eth_address_b: ${after_withdraw_eos_associate_eth_address_b_balance}`)
  console.log(`before transfer get balance eos_non_associate_eth_address_c: ${before_withdraw_eosiotoken_accountb_balance}`)
  console.log(`after transfer get balance eos_non_associate_eth_address_c: ${after_withdraw_eosiotoken_accountb_balance}`)
}

main()
