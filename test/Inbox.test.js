const assert = require('assert')
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, evm } = require('../compile')


let INITIAL_MESSAGE = "Hi there"

beforeEach(async () => {
    // Get a list of all account
    fetchedAccounts = await web3.eth.getAccounts()

    // use one of those account to deploy the contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: [INITIAL_MESSAGE] })
        .send({ from: fetchedAccounts[0], gas: '1000000' })
})

describe('inbox', () => {
    it('deployed inbox contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has initial message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_MESSAGE)
    })

    it('can change initial message', async () => {
        await inbox.methods.setMessage('I am updating my profile')
        .send({from: fetchedAccounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message, 'I am updating my profile')
    })
})