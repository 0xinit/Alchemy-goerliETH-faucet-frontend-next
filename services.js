import { ethers, Signer } from "ethers"
import { toast } from "react-hot-toast"

export const checkEarlyAccessNft = async(address) => {
    //Instead of using the Alchemy API here we directly call the Kudos proxy contract to 
    //check the balance of the users wallet for the token id ==2698 which is the early access token
    //by this method we can avoid the problem of stalling the application due to rate limit for the Alchemy API
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let iface = new ethers.utils.Interface([
            "function balanceOf(address,uint256)"
        ]);
        let callData = iface.encodeFunctionData("balanceOf", [
            address, 2698
        ]);
        const tx = await provider.call({
            to: "0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6", //Proxy contract deployed on Polygon mainnet
            data: callData // Calling the balanceOf() function of the contract on Polygon mainnet which gives the balance of the user's wallet which holds the Early access pass token(2698)
        });
        if (parseInt(tx) > 0) {
            return true; //if the balance is greater than 0 then it is validated that the user has the early access token
        } else {
            return false;
        }
    } catch (error) {
        alert(error);
    }
}

export const sendFund = async(address) => {
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

export const donate = async(signer, amount) => {
    console.log(amount)
    const txn = await signer.sendTransaction({
        to: "0x2306dA564868c47bb2C0123A25943cD54e6e8e2F",
        value: ethers.utils.parseEther(amount),
        gasLimit: 25000,
    })
    const receipt = await txn.wait(1)
}