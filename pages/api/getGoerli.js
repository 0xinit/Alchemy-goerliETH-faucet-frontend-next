// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ethers } from "ethers"

const Wallet=new ethers.Wallet(process.env.WALLET_PRIVATE_KEY,
  ethers.getDefaultProvider(process.env.ALCHEMY_URL))

export default async function handler(req, res) {
  try {
   if(req.method!='POST'){
    return res.status(400).json({message:"Please use post request"})
   }

   const walletAddress=req.body.address

   const txn=await Wallet.sendTransaction({
    to:walletAddress,
    value:ethers.utils.parseEther("0.000001")
   })
   console.log(txn)
   res.status(200).json({message:"Transaction succesful!"})
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Internal Server Error!"})
  }
}
