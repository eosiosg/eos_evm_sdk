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
    tokenSymbol: 'EOS',
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
    tokenSymbol: 'EOS',
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
   * test code
   * */
  const accountb = 'eosevm11111b'
  const accountc = 'eosevm11111c'
  const accountd = 'eosevm11111d'
  const native_eth_address_b = '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6'
  const native_eth_address_c = '0x39944247c2edf660d86d57764b58d83b8eee9014'
  const native_eth_address_d = '0xe327e755438fbdf9e60891d9b752da10a38514d1'
  const eos_associate_eth_address_b = '0xf3c855f2988f7eabc4b4352bc5980825ebd8c3ef'

  const eos_evm_sdk = new Eos_evm_sdk(rpc, api, config)

  console.log('------------------------------ set contract address ------------------------------')
  await eos_evm_sdk.setContract().then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ link token  ------------------------------')
  await eos_evm_sdk.linkToken(4, 'EOS', 'eosio.token').then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ update auth ------------------------------')
  await eos_evm_sdk.updateAuth().then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ create ETH address ------------------------------')
  let account_eos_evm_b = new EOSEVMClient(rpc, api, config, accountb, '', '')
  // create associate EOS account ETH address
  await account_eos_evm_b.createAddress('aaaaaa').then((res) => console.log(res))
  // create native ETH address
  await account_eos_evm_b.createAddress(native_eth_address_b.slice(2)).then((res) => console.log(res))

  let account_eos_evm_c = new EOSEVMClient(rpc, api, config, accountc, '', '')
  // create associate EOS account ETH address
  await account_eos_evm_c.createAddress('aaaaaa').then((res) => console.log(res))
  // create native ETH address
  await account_eos_evm_c.createAddress(native_eth_address_c.slice(2)).then((res) => console.log(res))

  let account_eos_evm_d = new EOSEVMClient(rpc, api, config, accountd, '', '')
  // create associate EOS account ETH address
  await account_eos_evm_d.createAddress('aaaaaa').then((res) => console.log(res))
  // create native ETH address
  await account_eos_evm_d.createAddress(native_eth_address_d.slice(2)).then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ get all ETH address ------------------------------')
  await account_eos_evm_c.getAllAccounts().then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')


  console.log('------------------------------ create ERC20 ETH contract ------------------------------')
  let account_eosevm11111b_native_eth = new EOSEVMClient(rpc, api, config, '', native_eth_address_b, '')
  let contract_address = ''
  await account_eosevm11111b_native_eth.createContract([100000, 'first token', 4, 'SYS']).then(
    res => {
      contract_address = `0x` + JSON.parse(res.processed.action_traces[0].console)["create address"]
      console.log(`contract address: ${contract_address}`)
    }
  )
  console.log('----------------------------------------------------------------------------------')

  ///('------------------------------ construct ETH address object ------------------------------')
  const account_eosevm11111b_eos_associate = new EOSEVMClient(rpc, api, config, accountb, eos_associate_eth_address_b, '')
  account_eosevm11111b_native_eth = new EOSEVMClient(rpc, api, config, '', native_eth_address_b, contract_address)

  const account_eosevm11111c_native_eth = new EOSEVMClient(rpc, api, config, '', native_eth_address_c, contract_address)

  const account_eosevm11111d_native_eth = new EOSEVMClient(rpc, api, config, '', native_eth_address_d, contract_address)

  await sleep(1000)

  console.log('------------------------------ ERC20 token transfer ------------------------------')
  await account_eosevm11111b_native_eth.ERC20Transfer(native_eth_address_c, 100).then(
    res => console.log(res)
  )
  console.log('----------------------------------------------------------------------------------')

  await sleep(500)

  console.log('------------------------------ Balance of native_eth_address_c ------------------------------')
  await account_eosevm11111c_native_eth.ERC20BalanceOf().then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ ERC20 token transfer ------------------------------')
  await account_eosevm11111b_native_eth.ERC20Transfer(native_eth_address_d, 500).then(
    res => console.log(res)
  )
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ Balance of native_eth_address_d ------------------------------')
  await account_eosevm11111d_native_eth.ERC20BalanceOf().then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ ERC20 token Approve ------------------------------')
  await account_eosevm11111d_native_eth.ERC20Approve(native_eth_address_c, 200).then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ ERC20 token allowance ------------------------------')
  await account_eosevm11111d_native_eth.ERC20Allowance(native_eth_address_c).then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ ERC20 token transfer from ------------------------------')
  await account_eosevm11111c_native_eth.ERC20TransferFrom(native_eth_address_d,
    native_eth_address_c, 20).then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ Balance of native_eth_address_c ------------------------------')
  await account_eosevm11111c_native_eth.ERC20BalanceOf().then(res => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ deposit native_eth_address_c ------------------------------')
  await account_eosevm11111b_eos_associate.deposit('0.0010 EOS').then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ get balance native_eth_address_c ------------------------------')
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => console.log(`balance: ${balance}`))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ withdraw native_eth_address_c ------------------------------')
  await account_eosevm11111b_eos_associate.withdraw('0.0010 EOS').then((res) => console.log(res))
  console.log('----------------------------------------------------------------------------------')

  console.log('------------------------------ get balance native_eth_address_c ------------------------------')
  await account_eosevm11111b_eos_associate.getBalance().then((balance) => console.log(`balance: ${balance}`))
  console.log('----------------------------------------------------------------------------------')
}

main()
