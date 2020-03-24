const Eos_evm_sdk = require('./eos_evm_sdk')

class EOSEVMClient extends Eos_evm_sdk {
  constructor (rpc, api, config, eos_account, eth_address, contract_dest) {
    super(rpc, api, config)
    this.eos_account = eos_account
    this.eth_address = eth_address
    this.contract_dest = contract_dest
  }

  async transfer (to, value) {
    return super.transfer(this.eth_address, to, value)
  }

  async createAddress (eth_address) {
    if (!this.eos_account) {
      throw new Error("should create eos account first")
    }
    return await super.createETHAddress(this.eos_account, eth_address)
  }

  async deposit (quantity) {
    super.depositToken(this.eos_account, quantity)
  }

  async withdraw (quantity) {
    super.withdrawEOSToken(this.eos_account, quantity)
  }

  async getNonce () {
    return super.getSenderNonce(this.eth_address)
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

  async ERC20Transfer (to, amount) {
    return super.ERC20Transfer(this.contract_dest, this.eth_address, to, amount)
  }

  async ERC20BalanceOf () {
    return super.ERC20BalanceOf(this.contract_dest, this.eth_address)
  }

  async ERC20TotalSupply () {
    return super.ERC20TotalSupply(this.contract_dest, this.eth_address)
  }

  async ERC20Symbol () {
    return super.ERC20Symbol(this.contract_dest, this.eth_address)
  }

  async ERC20Decimals () {
    return super.ERC20Decimals(this.contract_dest, this.eth_address)
  }

  async ERC20Approve (spender, amount) {
    return super.ERC20Approve(this.contract_dest, spender, amount, this.eth_address)
  }

  async ERC20Allowance (spender) {
    return super.ERC20Allowance(this.contract_dest, this.eth_address, spender, this.eth_address)
  }

  async ERC20TransferFrom (to, value) {
    return super.ERC20TransferFrom(this.contract_dest, this.eth_address, to, value, this.eth_address)
  }

  async call (method,
              args,
              nonce = 0,
              value = 0,
              ethSign = true,
              gasPrice = this.config.defaultGasPrice,
              gasLimit = this.config.defaultGasLimit) {
    return super.sendRawAction(this.contract_dest, method, args, this.eth_address, nonce, value, false, ethSign, gasPrice, gasLimit)
  }

  async createContract (args,
                        nonce = 0,
                        value = 0,
                        ethSign = true,
                        gasPrice = this.config.defaultGasPrice,
                        gasLimit = this.config.defaultGasLimit
  ) {
    return super.sendRawAction('', '', args, this.eth_address, nonce, value, false, ethSign, gasPrice, gasLimit)
  }

  async sendAction (method,
                    args,
                    nonce = 0,
                    value = 0,
                    transfer = false,
                    ethSign = true,
                    gasPrice = this.config.defaultGasPrice,
                    gasLimit = this.config.defaultGasLimit) {
    return super.sendRawAction(this.contract_dest, method, args, this.eth_address, nonce, value, transfer, ethSign, gasPrice, gasLimit)
  }
}


module.exports = EOSEVMClient

