import React, { useState } from "react"
import { Button, Box, Spinner } from "@chakra-ui/react"
import { donate } from "../services"
import { useSigner } from "wagmi"
import { toast } from "react-hot-toast"
const Donate = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    const handleDonate = async () => {
        try {
            setIsPending(true)
            const res = await donate(signer)
            setIsPending(false)
            toast.success("Thanks for donating!")
        } catch (err) {
            setError(true)
        }
    }
    if (!signer) {
        return null
    } else {
        return (
            <Box>
                <Button
                    isLoading={isPending}
                    loadingText="Pending"
                    isDisabled={isPending}
                    colorScheme="blue"
                    size="md"
                    onClick={handleDonate}
                >
                    Donate 0.1 ETH to Faucet
                </Button>
            </Box>
        )
    }
}

export default Donate
