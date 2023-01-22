import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"
import Donate from "./Donate"
const Header = () => {
    return (
        <Flex justify="space-between" alignItems="center" mb="5">
            <Flex alignItems="center">
                <Image boxSize="50px" objectFit="cover" src="./logo.png" alt="AU Faucet" />
                <Heading as="h3" size="lg" ml="4">
                    AU Faucet
                </Heading>
            </Flex>
            <Flex gap="10">
                <ConnectButton
                    accountStatus={{
                        smallScreen: "avatar",
                        largeScreen: "full",
                    }}
                />
                <Donate />
            </Flex>
        </Flex>
    )
}

export default Header
