# eos_evm_sdk
EOS EVM js client

There are more debug logs in nodeos when open **--contract-console** and add **logging.json** in **config dir**

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
### 0. transfer
   * @method transfer
   * @for  Eos_evm_sdk
   * @param {string} to
   * @param {string} value   
   * native token transfer **to** account **value**
   * */
   ```js
   account_eosevm11111b_eos.transfer('0xd81f4358cb8cab53d005e7f47c7ba3f5116000a6', '1000')
   ```
   

### 1. createETHAddress
   * @method createETHAddress
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
   
### 5. getNonce
   * @method:
   * @for  Eos_evm_sdk
   * retrive nonce from eos table for current account
   * */
   
   ```js
   account_eosevm11111b_eos.getNonce().then((res) => console.log(res))
   ```
   
### 6. getAccountInfoByETH
   * @method getAccountInfoByETH
   * @for  Eos_evm_sdk
   * get account infomation by ETH address
   * */
   ```js
   account_eosevm11111b_eos.getAccountInfoByETH().then((res) => console.log(res))
   ```
    
### 7. getAccountInfoByEOS
   * @method getAccountInfoByEOS
   * @for  Eos_evm_sdk
   * get account infomation by EOS account
   * */
   ```js
   account_eosevm11111b_eos.getAccountInfoByEOS().then((res) => console.log(res))
   ```
### 8. getAssociateEOS
   * @method getAssociateEOS
   * @for  Eos_evm_sdk
   * get associate EOS account in account infomation
   * */
   ```js
   account_eosevm11111b_eos.getAssociateEOS().then((res) => console.log(res))
   ```
    
### 9. getBalance
   * @method getBalance
   * @for  Eos_evm_sdk
   * get balance for current address
   * */
   ```js
   account_eosevm11111b_eos.getBalance().then((res) => console.log(res))
   ```
    
### 10. setContract
   * @method setContract
   * @for  Eos_evm_sdk
   * @param {array} args
   * @param {string} quantity
   * set contract in current address
   * */
   ```js
   account_eosevm11111b_eos.setContract([10000, 'first token', 4, 'SYS']).then((res) => console.log(res))
   ```
### 11 ERC20 wrapper

#### 11.1 ERC20Transfer
   * @method ERC20Transfer
   * @for  Eos_evm_sdk
   * @param {string} to
   * @param {string} value
   * transfer from current account to **to** account
   * */
   ```js
   account_eosevm11111b_raw_eth.ERC20Transfer('0x8c68f5c66628480dd2c2323a7c972fda099900cc', '0x1100')
   ```

#### 11.2 ERC20Approve
   * @method ERC20Approve
   * @for  Eos_evm_sdk
   * @param {string} spender
   * @param {string} amount
   * approve spender to cost amount value from owner
   * */
  ```js
  account_eosevm11111b_raw_eth.ERC20Approve('0x39944247c2edf660d86d57764b58d83b8eee9014', '200').then((res) => console.log(res))
  ```
    
#### 11.3 ERC20TransferFrom
   * @method ERC20TransferFrom
   * @for  Eos_evm_sdk
   * @param {string} to
   * @param {string} value
   * transfer from current account to **to** account, this method is used with **ERC20Approve** method
   * */
   ```js
   account_eosevm11111b_raw_eth.ERC20TransferFrom('0x39944247c2edf660d86d57764b58d83b8eee9014', '100').then((res) => console.log(res))
   ```
  
  
### 12. sendAction
   * @method sendAction
   * @for  Eos_evm_sdk
   * @param {string} method: function signature need to be send
   * @param {array} args: function param need to be send
   * @param {int} nonce: nonce, if = 0, it will retrive from EOSIO account table
   * @param {int} value: transfer value amount wei, default 0
   * @param {boolean} transfer: if true native transfer, defalut false
   * @param {boolean} ethSign: if true use ETH sign else use EOS signature
   * @param {boolean} isCreateContract: is create contract, if create contract, type is CONTRACT_CREATE, else MESSAGE_CALL
   * @param {string} gasPrice: hex string i.e: '0x09184e72a000', defalut config.defaultGasPrice
   * @param {string} gasLimit: hex string i.e: '0x27100', default config.defaultGasLimit
   * send raw transaction
   * there are three types of sending raw transaction
   * 1. create contract address
   * 2. execute vm code for certain evm address
   * */
  ```js
  account_eosevm11111b_raw_eth.sendAction(
  'transferFrom',
  ['0xe327e755438fbdf9e60891d9b752da10a38514d1', '0x39944247c2edf660d86d57764b58d83b8eee9014', '10']
  )
  ```
    
    
    
    
