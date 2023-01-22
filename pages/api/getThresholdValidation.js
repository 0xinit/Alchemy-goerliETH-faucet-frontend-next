import { ethers } from "ethers"

export default async function handler(req, res) {
    try {
        if (req.method != 'POST') {
            return res.status(400).json({ message: "Please use post request" })
        }

        const threshold = process.env.threshold || 0.1 // provide the threshold to check whether to dispense , 0.1 as default
        const provider = ethers.getDefaultProvider(process.env.ALCHEMY_URL)//assume that provider is provide by project faciltator
        const balance = await provider.getBalance(req.body.address) //get balace of address
        const balanceInEth = ethers.utils.formatEther(balance) // convert from wei to ETH

        if (balanceInEth > threshold) { //check if balcne higher than threshold
            res.status(400).json({ message: "you have too high balance, Validation unsuccess" })
        }
        else {
            res.status(200).json({ message: "Validation sucessful" })
        }
        return
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error!" })
        return
    }

}
