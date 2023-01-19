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
