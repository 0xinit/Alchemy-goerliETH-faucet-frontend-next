import { Flex, Heading } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import React from "react"
import Donate from "./Donate"
import { Box } from "@chakra-ui/react"

const Header = () => {
    return (
        <Flex justify="space-between" mb="5">
            <Heading as="h3" size="lg">
                AU Faucet
            </Heading>
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
