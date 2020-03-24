const  Eos_evm_sdk  = require('./eos_evm_sdk')
const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')      // development only

const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')                   // node only; native TextEncoder/Decoder

const defaultPrivateKey = "" // bob
const akey = "" // eosevm111111
const bkey = "" // eosevm11111b
const ckey = "" // eosevm11111c
const dkey = "" // eosevm11111d
const fkey = "" // eosevm11111d

const signatureProvider = new JsSignatureProvider([defaultPrivateKey, akey, bkey, ckey, dkey, fkey])

const rpc = new JsonRpc('https://api-kylin.eoslaomao.com', { fetch })

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })


const env = 'kylin'
let config = {}

if (env === "mainnet") {

} else if (env === 'kylin') {
  config = {
    chainid: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
    endpoint: 'https://api-kylin.eoslaomao.com',
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
    defaultGasPrice: '0x01',
    defaultGasLimit: '0x27100'
  }
} else if (env === 'local') {
  config = {
    chainid: '09c39d2fc860330acd4842a847a2a47228a3077257372b82845128b0bf90f53b',
    endpoint: 'https://127.0.0.1:8888',
    contract: 'eosevm111111',
    tokenContract: 'eosio.token',
    tokenPrecision: 4,
    tokenSymbol: 'EOS',
    worker: 'bpf',
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
    defaultGasPrice: '0x01',
    defaultGasLimit: '0x27100'
  }
}

const eos_evm_sdk = new Eos_evm_sdk(rpc, api, config)

/**
 * test code
 * */
// eos_evm_sdk.depositToken('eosevm11111b', '100.0000 EOS')
// eos_evm_sdk.getBalanceByEOS('eosevm11111b').then((res) => console.log(`balance is: ${res}`))
// eos_evm_sdk.transfer('0x46051cfbfd3453f72565818a6b3e0a155a804330', '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', '1000')
// eos_evm_sdk.linkToken(`{"sym":"4,EOS", "contract":"eosio.token"}`)

// eos_evm_sdk.createETHAddress('eosevm11111b', 'aaaaaa')
// eos_evm_sdk.createETHAddress('eosevm11111b', 'd81f4358cb8cab53d005e7f47c7ba3f5116000a6')
// eos_evm_sdk.createETHAddress('eosevm11111c', 'aaaaaa')
// eos_evm_sdk.createETHAddress('eosevm11111c', '39944247c2edf660d86d57764b58d83b8eee9014')
// eos_evm_sdk.createETHAddress('eosevm11111d', 'aaaaaa')
// eos_evm_sdk.createETHAddress('eosevm11111d', 'e327e755438fbdf9e60891d9b752da10a38514d1')

// eos_evm_sdk.getAccountByEOS('eosevm11111b').then((res) => console.log(res))

// eos_evm_sdk.deployContract(
//   '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6',
//   [10000, 'first token', 4, 'SYS'],
// )

// eos_evm_sdk.ERC20TotalSupply(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   '0x39944247c2edf660d86d57764b58d83b8eee9014'
// )

// eos_evm_sdk.ERC20Symbol(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   '0x39944247c2edf660d86d57764b58d83b8eee9014'
// )

// eos_evm_sdk.ERC20Decimals(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   '0x39944247c2edf660d86d57764b58d83b8eee9014'
// )

// eos_evm_sdk.ERC20Transfer(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6',
//   '0x39944247c2edf660d86d57764b58d83b8eee9014',
//   '0x29'
// )

// eos_evm_sdk.ERC20BalanceOf(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   '0x39944247c2edf660d86d57764b58d83b8eee9014'
// )

// eos_evm_sdk.sendRawAction(
//   '',
//   '',
//   [10000, 'first token', 4, 'SYS'],
//   '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6',
//   0,0, true
// )

// eos_evm_sdk.sendRawAction(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   'balanceOf',
//   ['0x39944247c2edf660d86d57764b58d83b8eee9014'],
//   '0x39944247c2edf660d86d57764b58d83b8eee9014'
// )
//
// eos_evm_sdk.sendRawAction(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   'transfer',
//   ['0x39944247c2edf660d86d57764b58d83b8eee9014', '0x14'],
//   '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6'
// )
//
// eos_evm_sdk.sendRawAction(
//  '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//  'approve',
//  ['0x39944247c2edf660d86d57764b58d83b8eee9014', '200'],
//  '0xe327e755438fbdf9e60891d9b752da10a38514d1'
// )
//
// eos_evm_sdk.sendRawAction(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   'allowance',
//   ['0xe327e755438fbdf9e60891d9b752da10a38514d1', '0x39944247c2edf660d86d57764b58d83b8eee9014'],
//   '0xe327e755438fbdf9e60891d9b752da10a38514d1'
// )
//
// eos_evm_sdk.sendRawAction(
//   '0x4a40687878845ef7cfe60b5a6f2cb47627469b77',
//   'transferFrom',
//   ['0xe327e755438fbdf9e60891d9b752da10a38514d1', '0x39944247c2edf660d86d57764b58d83b8eee9014', '10'],
//   '0xe327e755438fbdf9e60891d9b752da10a38514d1'
// )


const EOSEVMClient  = require('./EOSEVMClient')
let account_eos_evm_a = new EOSEVMClient(rpc, api, config, 'eosevm11111d', '', '')
account_eos_evm_a.createAddress('0xe327e755438fbdf9e60891d9b752da10a38514d1').then((res) => console.log(res))

// account_eos_evm_a.getAccountInfoByEOS().then((res) => console.log(res))

const account_eosevm11111b_eos = new EOSEVMClient(rpc, api, config, 'eosevm11111b', '0xf3c855f2988f7eabc4b4352bc5980825ebd8c3ef', '')
const account_eosevm11111b_raw_eth = new EOSEVMClient(rpc, api, config, '', '0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', '0x4a40687878845ef7cfe60b5a6f2cb47627469b77')

const account_eosevm11111c_eos = new EOSEVMClient(rpc, api, config, 'eosevm11111c', '0xbb48c1cd567dba75be49e6574639041a2c042c0d', '')
const account_eosevm11111c_raw_eth = new EOSEVMClient(rpc, api, config, '', '0x39944247c2edf660d86d57764b58d83b8eee9014', '0x4a40687878845ef7cfe60b5a6f2cb47627469b77')

const account_eosevm11111d_eos = new EOSEVMClient(rpc, api, config, 'eosevm11111d', '0x8c68f5c66628480dd2c2323a7c972fda099900cc', '')
const account_eosevm11111d_raw_eth = new EOSEVMClient(rpc, api, config, '', '0xe327e755438fbdf9e60891d9b752da10a38514d1', '0x4a40687878845ef7cfe60b5a6f2cb47627469b77')

// account_client.ERC20BalanceOf('0x4a40687878845ef7cfe60b5a6f2cb47627469b77')
// account_eosevm11111b_eos.deposit('10.0000 EOS')
// account_client.getSenderNonce().then((res) => console.log(`nonce: ${res}`))
// account_eosevm11111b_eos.transfer('0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', '1000')

// account_eosevm11111b_eos.getBalance().then((balance) => console.log(`balance: ${balance}`))

// account_eosevm11111b_eos.transfer('0x46051cfbfd3453f72565818a6b3e0a155a804330', '1000')
// account_eosevm11111b_raw_eth.transfer('0x8c68f5c66628480dd2c2323a7c972fda099900cc', '500').then((res) => console.log(res))


// account_eosevm11111b_raw_eth.ERC20TotalSupply().then(res => console.log(res))
// account_eosevm11111b_raw_eth.ERC20Transfer('0x8c68f5c66628480dd2c2323a7c972fda099900cc', '0x1100')
// account_eosevm11111b_raw_eth.ERC20BalanceOf().then(res => console.log(res))

