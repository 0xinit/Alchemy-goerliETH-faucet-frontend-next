import { Box, Heading } from "@chakra-ui/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { useAccount, useNetwork } from "wagmi"
import Form from "../components/Form"
import Header from "../components/Header"
import { checkEarlyAccessNft, sendFund } from "../services"
import { getNetwork } from "@wagmi/core"

export default function Home() {
    const [isValidAddress, setIsValidAddress] = useState(false)
    const { address } = useAccount()

    useEffect(() => {
        if (!address) return
        ;(async () => {
            const _isValidAddress = await checkEarlyAccessNft(address)
            if (_isValidAddress) {
                setIsValidAddress(true)
            } else {
                setIsValidAddress(false)
            }
        })()
    }, [address])

    return (
        <Box mt="10">
            <Head>
                <title>AU Goerli Faucet</title>
                <meta name="description" content="Goerlui faucet for AU students" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box maxW="container.lg" mx="auto">
                <Header />
                {isValidAddress ? (
                    <Form />
                ) : (
                    <Box mt="32" textAlign="center">
                        <Heading> Connect yout account that contains AU Early Access NFT </Heading>
                    </Box>
                )}
            </Box>
            <Toaster />
        </Box>
    )
}
