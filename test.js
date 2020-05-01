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


async function main () {
  /**
   * test code
   * */
  const eos_evm_sdk = new Eos_evm_sdk(rpc, api, config)

  console.log('------------------------------ set contract address ------------------------------')
  await eos_evm_sdk.depolyEosEvm().then((res) => console.log(res))

  console.log('------------------------------ link token  ------------------------------')
  await eos_evm_sdk.linkToken(4, 'EOS', 'eosio.token').then((res) => console.log(res))

  console.log('------------------------------ update auth ------------------------------')
  await eos_evm_sdk.updateAuth().then(res => console.log(res));

  console.log('------------------------------ create ETH address ------------------------------')
  let account_eos_evm_b = new EOSEVMClient(rpc, api, config, 'eosevm11111b', '', '')
  await account_eos_evm_b.createAddress('aaaaaa').then((res) => console.log(${res}))
  // create native ETH address
  await account_eos_evm_b.createAddress('d81f4358cb8cab53d005e7f47c7ba3f5116000a6').then((res) => console.log(${res}))

  let account_eos_evm_c = new EOSEVMClient(rpc, api, config, 'eosevm11111c', '', '')
  await account_eos_evm_c.createAddress('aaaaaa').then((res) => console.log(${res}))
  // create native ETH address
  await account_eos_evm_c.createAddress('39944247c2edf660d86d57764b58d83b8eee9014').then((res) => console.log(${res}))

  let account_eos_evm_d = new EOSEVMClient(rpc, api, config, 'eosevm11111d', '', '')
  await account_eos_evm_d.createAddress('aaaaaa').then((res) => console.log(${res}))
  // create native ETH address
  await account_eos_evm_d.createAddress('e327e755438fbdf9e60891d9b752da10a38514d1').then((res) => console.log(${res}))

  console.log('------------------------------ get all ETH address ------------------------------')
  await account_eos_evm_c.getAllAccounts().then((res) => console.log(${res}))


  console.log('------------------------------ create ERC20 ETH contract ------------------------------')
  let account_eosevm11111b_raw_eth = new EOSEVMClient(rpc, api, config, '', '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', '')
  let contract_address = ''
  await account_eosevm11111b_raw_eth.createContract([100000, 'first token', 4, 'SYS']).then(
    res => {
      contract_address = `0x` + JSON.parse(res.processed.action_traces[0].console)["create address"]
      console.log(`contract address: ${contract_address}`)
    }
  )

  console.log('------------------------------ construct ETH address object ------------------------------')
  const account_eosevm11111b_eos = new EOSEVMClient(rpc, api, config, 'eosevm11111b', '0xf3c855f2988f7eabc4b4352bc5980825ebd8c3ef', '')
  account_eosevm11111b_raw_eth = new EOSEVMClient(rpc, api, config, '', '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', contract_address)

  const account_eosevm11111c_eos = new EOSEVMClient(rpc, api, config, 'eosevm11111c', '0xbb48c1cd567dba75be49e6574639041a2c042c0d', '')
  const account_eosevm11111c_raw_eth = new EOSEVMClient(rpc, api, config, '', '0x39944247c2edf660d86d57764b58d83b8eee9014', contract_address)

  const account_eosevm11111d_eos = new EOSEVMClient(rpc, api, config, 'eosevm11111d', '0x8c68f5c66628480dd2c2323a7c972fda099900cc', '')
  const account_eosevm11111d_raw_eth = new EOSEVMClient(rpc, api, config, '', '0xe327e755438fbdf9e60891d9b752da10a38514d1', contract_address)


  await account_eosevm11111b_raw_eth.ERC20Transfer('0x46051cfbfd3453f72565818a6b3e0a155a804330', 1).then(
    res => console.log(res.processed.action_traces[0].console)
  )

  await account_eosevm11111b_eos.deposit('0.0010 EOS').then((res) => console.log(res))
  await account_eosevm11111b_raw_eth.getNonce().then((res) => console.log(`nonce: ${res}`))
  await account_eosevm11111b_eos.transfer('0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', 1000000).then((res) => console.log(res))
  await account_eosevm11111b_eos.getBalance().then((balance) => console.log(`balance: ${balance}`))
  await account_eosevm11111b_raw_eth.transfer('0x39944247c2edf660d86d57764b58d83b8eee9014', 20).then((res) => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20TotalSupply().then((res) => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20Symbol().then((res) => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20Transfer('0x46051cfbfd3453f72565818a6b3e0a155a804330', 1).then(
    res => console.log(res)
  )
  await account_eosevm11111b_raw_eth.ERC20BalanceOf().then(res => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20Symbol().then(res => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20TotalSupply().then(res => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20Decimals().then(res => console.log(res))

  await account_eosevm11111b_raw_eth.ERC20Approve('0x39944247c2edf660d86d57764b58d83b8eee9014', 10).then(res => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20Allowance('0x39944247c2edf660d86d57764b58d83b8eee9014').then(res => console.log(res))
  await account_eosevm11111b_raw_eth.ERC20TransferFrom('0x39944247c2edf660d86d57764b58d83b8eee9014', 1,).then(res => console.log(res))
  await account_eosevm11111b_raw_eth.call('transfer',
    ['0x46051cfbfd3453f72565818a6b3e0a155a804330', 1],
    false
  ).then((res) => console.log(res))
}
main()
