// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ethers } from "ethers";
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    ALCHEMY_API_KEY
);

const Wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

export default async function sendEth(req, res) {
    try {
        if (req.method != "POST") {
            return res.status(400).json({ message: "Please use post request" });
        }

        const walletAddress = req.body.address;
        const txn = await Wallet.sendTransaction({
            to: walletAddress,
            value: ethers.utils.parseEther("0.000001"),
        });
        const receipt = await txn.wait(1);

        res.status(200).json({ message: "Transaction succesful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong!" });
    }
}
