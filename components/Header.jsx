import { Flex, Heading } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"

const Header = () => {
    return (
        <Flex justify="space-between" mb="5">
            <Heading as="h3" size="lg">
                AU Faucet
            </Heading>
            <ConnectButton />
        </Flex>
    )
}

export default Header
