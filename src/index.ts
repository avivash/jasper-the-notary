const fs = require('fs')
const path = require('path')

const didTransformers = require('ucans/did/transformers')
const ucans = require('ucans')
const uint8arrays = require('uint8arrays')
const { EdKeypair } = require('ucans/keypair/ed25519')

const commentary = require('./commentary')

const main = async () => {
  const args: string[] = process.argv.slice(2);

  const keypair = await loadKeypair()

  if (args.length === 0) {
    // welcome

    console.log(commentary.welcome)


    // emit UCAN for registry

  } else {
    const route = args[0]
    const proof = args[1]

    // check proof

    // comment

    // emit UCAN
  }

  // console.log("keypair", keypair)
}

const loadKeypair = async (): Promise<typeof EdKeypair> => {
  const root = path.resolve(__dirname, '..')
  const keyPath = root + '/SECRET_KEY'
  const didPath = root + '/DID'

  try {
    const secretKey = fs.readFileSync(keyPath).toString()
    const keypair = await EdKeypair.fromSecretKey(secretKey, { format: "base64pad" })
    const did = didTransformers.publicKeyBytesToDid(keypair.publicKey, "ed25519")

    console.log(`👋 Welcome back ${did}`)

    return keypair
  } catch {

    const keypair = await EdKeypair.create({ exportable: true })
    const secretKey = uint8arrays.toString(keypair.secretKey, "base64pad")
    const did = didTransformers.publicKeyBytesToDid(keypair.publicKey, "ed25519")
    fs.writeFileSync(keyPath, secretKey)
    fs.writeFileSync(didPath, did)

    console.log("👋 Welcome adventurer.")
    console.log(`🆔 We will know you as ${did} going forward.`)

    return keypair 
  }
}

main()