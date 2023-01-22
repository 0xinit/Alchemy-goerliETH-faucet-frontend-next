import { Box, Flex, Heading, Image } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"
import Donate from "./Donate"
const Header = () => {
    return (
        <Flex justify="space-between" mb="5">
            <Flex alignItems="center">
                <Image boxSize="50px" objectFit="cover" src="./logo.png" alt="AU Faucet" />
                <Heading as="h3" size="lg" ml="3">
                    AU Faucet
                </Heading>
            </Flex>
            <Flex gap="5">
                <Donate />
                <ConnectButton
                    accountStatus={{
                        smallScreen: "avatar",
                        largeScreen: "full",
                    }}
                />
            </Flex>
        </Flex>
    )
}

export default Header
