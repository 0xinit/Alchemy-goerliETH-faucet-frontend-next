import { Network, Alchemy } from "alchemy-sdk"

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET, // Replace with your network.
}

const alchemy = new Alchemy(settings)

const nftCollection = "0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6"

export default async function getNftValidation(req, res) {
    const walletAddress = req.body.address
    const response = await alchemy.nft.verifyNftOwnership(walletAddress, nftCollection)
    if (response) {
        return res.status(200).json({
            message: "Enjoy 0.0001 Goerli ETH",
        })
    } else {
        return res.status(404).json({
            message: "You don't have a Early Access NFT",
        })
    }
}
