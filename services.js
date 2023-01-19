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
    console.log(address)
    toast("Request Initiated!", { icon: "🚀" })
    try {
        const response = await fetch("api/getGoerli", {
            method: "POST",
            body: JSON.stringify({ address }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            const data = await response.json()
            toast.success(data.message, { duration: 100000 })
        } else {
            toast.error("Something went wrong in api!")
        }
    } catch (err) {
        console.error(err)
        toast.error("Something went wrong in api!")
    }
}

export const donate = async (signer) => {
    toast("Transation Initiated! 🎊", { icon: "🚀" })
    const txn = await signer.sendTransaction({
        to: "0x2306dA564868c47bb2C0123A25943cD54e6e8e2F",
        value: ethers.utils.parseEther("0.1"),
        gasLimit: 25000,
    })
    const receipt = await txn.wait(1)
}
