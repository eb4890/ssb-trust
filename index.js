
exports.name = 'ssb-trust'
exports.version = require('./package.json').version

require('./schema/')

var isTrustMessage = require('./schema/validator')

const FlumeReduce = require('flumeview-reduce')
const indexVersion = 100

const trustTypeMessages = ['trust']

exports.manifest = {
  trustForAction: 'async',
  trustInformationForAction: 'async'
}

exports.init = function (ssb, config) {
  const view = ssb._flumeUse('ssb-trust-index',
    FlumeReduce(
      indexVersion,
      flumeReduceFunction,
      flumeMapFunction
    )
  )
}

function flumeReduceFunction (index, item) {
  if (!index) index = {}
  var type = item.value.content.type
  if ( type === 'trust'  && isTrustMessage(item)) {
    var operation = item.value.content.operation
    var resource = item.value.content.resource
    var author = item.value.author
    var trustee = item.value.content.trustee
    var value = item.value.content.value
    !(trustee in index ) && (index[trustee] = {})
    !(resource in index[trustee]) && (index[trustee][resource] = {})
    !(operation in index[trustee][resource][operation]) && (index[trustee][resource][operation] = {})

    !(author in index[trustee][resource][operation]) && (index[trustee][resource][operation][author] = {})
    index[trustee][resource][operation][author] = value
  }
}

/*

Use cases:

You want to assign someone the position of manager of a set of resources for a community. They can delegate all or part of that responsibility to others.

"content" : {
    "type" : "delegate-chain",
    "application" : "*",
    "composite" : "group://scuttlers",
    "object" : "*",
    "value" : "allow",
    "trustee" :  <key-id>,
}

Views of trust

Personal - These are things you have personally trusted

Social - These are things that people you follow have trusted
Social Removed - These are things that people you follow have trusted

Delegated - These are explicit trust delegations you have made to other people that allow them to change what you trust.

Social Delegated - These are people in your social graph that have explicitly made trust delegations.

Implicit - Someone does an operation on a resource and you use that view of a resource. This adds an implict trust into your chain so that you keep on seeing the same view of things.

Implicit Delegated - Someone makes a claim on being an authority over a set of resources. You use that delegation to make decisions on what view to have. Then you implpicitly trust the delegations, to keep a consistent view over time.

*/

function flumeMapFunction (msg) {
  if (msg.value.content && isTrustTypeMessage(msg.value.content)) {
    return msg
  }
}

function isTrustTypeMessage (content) {
  return trustTypeMessages.find(type => content.type === type) !== undefined
}




//This function create a mapfunction that will filter out only trusted operations
/*
Trust options format
keepUntrusted,
keepPartialTrust,
addTrustStats,
addTrustDetails 
trustLevel: High, medium, low
customTrustInfo
*/
function createTrustMapFunction (authorsList, operationMatchFunc, resourceMatchFunc, trustOptions, view) {

   return ((content) => {
     // Get author from content
     // Look up in authorslist
     // Filter by operationsMatch
     // Filter 
     // do filter
     // do addition
      
    
   });
  	
}


