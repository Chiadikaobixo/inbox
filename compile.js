const path = require('path')
const fs = require('fs')
const solc = require('solc');


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

var input = {
  language: 'Solidity',
  sources: {
    'inbox.sol': {
    content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']['inbox'];

module.exports = output