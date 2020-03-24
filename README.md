# eos_evm_sdk
EOS EVM js client

## 1. Construct EOSEVMClient
```js
const EOSEVMClient  = require('./EOSEVMClient')

const signatureProvider = new JsSignatureProvider([defaultPrivateKey, akey, bkey, ckey, dkey, fkey])

const rpc = new JsonRpc('https://api-kylin.eoslaomao.com', { fetch })

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

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
  
  let account_eos_evm_a = new EOSEVMClient(rpc, api, config, 'eosevm11111d', '', '')
```


### 1. createETHAddress
   * @method createETHAccount
   * @for  Eos_evm_sdk
   * @param {string} eos_account
   * @param {string} eth_address optional
   * @return
   * create  EOS associate account or ETH account
   * 1. create EOS account, second param string is optional
   * 2. create ETH account, second param string must be native ETH address which user own the private key
   * */

```js
let account_eos_evm_a = new EOSEVMClient(rpc, api, config, 'eosevm11111d', '', '')
account_eos_evm_a.createAddress('0xe327e755438fbdf9e60891d9b752da10a38514d1').then((res) => console.log(res))
```

### 2. linkToken
   * @method linkToken
   * @for  Eos_evm_sdk
   * @param {string} extended_symbol
   * link token first
   * */

### 3. depositToken
   * @method depositToken
   * @for  Eos_evm_sdk
   * @param {string} from
   * @param {string} quantity
   * deposit EOS associate account quantity balance
   * transfer balance to evm contract address and will deposit balance to the associate EOSIO account address
   * */
   
   ```js
   account_eosevm11111b_eos.deposit('10.0000 EOS').then((res) => console.log(res))
   ```
   
### 4. withdrawToken
   * @method withdrawToken
   * @for  Eos_evm_sdk
   * @param {string} eos_account
   * @param {string} quantity
   * withdraw EOS associate account quantity balance
   * withdraw balance from evm contract address and will withdraw balance to the associate EOSIO account
   * */
   ```js
   account_eosevm11111b_eos.withdraw('10.0000 EOS').then((res) => console.log(res))
   ```
   
### getNonce
   * @method:
   * @for  Eos_evm_sdk
   * retrive nonce from eos table
   * */
   
   ```js
   account_eosevm11111b_eos.getNonce().then((res) => console.log(res))
   ```
   
### getAccountInfoByETH

   ```js
   account_eosevm11111b_eos.getAccountInfoByETH().then((res) => console.log(res))
   ```
    
### getAccountInfoByEOS

   ```js
   account_eosevm11111b_eos.getAccountInfoByEOS().then((res) => console.log(res))
   ```
### getAssociateEOS

   ```js
   account_eosevm11111b_eos.getAssociateEOS().then((res) => console.log(res))
   ```
    
### getBalance
   ```js
   account_eosevm11111b_eos.getBalance().then((res) => console.log(res))
   ```
    
### setContract
   * @method setContract
   * @for  Eos_evm_sdk
   * @param {array} args
   * @param {string} quantity
   * set contract in current address
   * */
   ```js
   account_eosevm11111b_eos.setContract([10000, 'first token', 4, 'SYS']).then((res) => console.log(res))
   ```
### ERC20 wrapper

#### ERC20Transfer

   ```js
   account_eosevm11111b_raw_eth.ERC20Transfer('0x8c68f5c66628480dd2c2323a7c972fda099900cc', '0x1100')
   ```
    
#### ERC20BalanceOf

   ```js
   account_eosevm11111b_raw_eth.ERC20BalanceOf().then((res) => console.log(res))
   ```
   
   
#### ERC20TotalSupply

  ```js
  account_eosevm11111b_raw_eth.ERC20TotalSupply().then((res) => console.log(res))
  ```


    
    
    
    
    
    
    
    
    