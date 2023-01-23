import { ethers, Signer } from "ethers"
import { toast } from "react-hot-toast"

export const checkEarlyAccessNft = async (address) => {
    try {
        const response = await fetch("api/getNftValidation", {
            method: "POST",
            body: JSON.stringify({ address }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.status === 200) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.error(err)
    }
}

export const sendFund = async (address) => {
    toast("Request Initiated!", { icon: "🚀" })
    try {
        const response = await fetch("api/getGoerli", {
            method: "POST",
            body: JSON.stringify({ address }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (response.status !== 200) {
            toast.error(data.message)
            return false
        } else {
            toast.success(data.message, { duration: 100000 })
            return true
        }
    } catch (err) {
        toast.error("Something went wrong in api!")
    }
}

export const donate = async (signer, amount) => {
    console.log(amount)
    const txn = await signer.sendTransaction({
        to: "0x2306dA564868c47bb2C0123A25943cD54e6e8e2F",
        value: ethers.utils.parseEther(amount),
        gasLimit: 25000,
    })
    const receipt = await txn.wait(1)
}
