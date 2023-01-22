import { Box, Button, Flex, Heading, Input, Spinner } from "@chakra-ui/react"
import { ethers } from "ethers"
import React, { useState } from "react"
import Confetti from "react-confetti"
import { toast } from "react-hot-toast"
import { sendFund } from "../services"
import { useWindowSize } from "react-use"

const Form = () => {
    const [address, setAddress] = useState("")
    const [showSpinner, setShowSpinner] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize()

    const handleValidation = async (_address) => {
        const validAddress = ethers.utils.isAddress(_address)
        if (validAddress) {
            setShowSpinner(true)
            const res = await sendFund(_address)
            if (res) {
                setShowSpinner(false)
                setShowConfetti(true)
                setAddress("")
            } else {
                setShowSpinner(false)
                setShowConfetti(false)
                setAddress("")
            }
        } else {
            toast.error("Invalid Address")
        }
    }
    return (
        <Flex direction="column" mt="32" justify="center" alignItems="center" gap="5">
            <Heading variant="h2" mb="5">
                Enter Goerli Address
            </Heading>
            <Input
                size="lg"
                w="2xl"
                variant="outline"
                bg="gray.100"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x..."
                value={address}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleValidation(address)
                    }
                }}
            />
            <Button
                isDisabled={showSpinner || showConfetti}
                onClick={() => handleValidation(address)}
                colorScheme="blue"
                size="lg"
                isLoading={showSpinner}
                loadingText="Pending"
            >
                Send Me 0.0001 ETH
            </Button>

            {showConfetti && <Confetti width={width} height={height} />}
        </Flex>
    )
}

export default Form
