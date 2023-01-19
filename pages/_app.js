import "../styles/globals.css"
import { Box, ChakraProvider } from "@chakra-ui/react"
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider } = configureChains([polygon, goerli], [publicProvider()])
const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
})
const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})
function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider modalSize="compact" chains={chains}>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default MyApp
