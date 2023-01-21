import '../styles/globals.css'
import { WagmiConfig } from 'wagmi';
import {configureChains,createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {goerli } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'


const {provider,webSocketProvider  } = configureChains(
  [goerli],
  [publicProvider()],
)
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }) {
    return ( 
      <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
    )
}

export default MyApp