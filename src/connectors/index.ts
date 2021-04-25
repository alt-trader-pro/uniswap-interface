import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import UNISWAP_LOGO_URL from '../assets/svg/logo.svg'

const CHAIN_ID="3"
const NETWORK_URL = "https://ropsten.infura.io/v3/057e7293dcd0418794e3d226e5844cee"
const PORTIS_ID = "b0dbb7ff-8c4d-4472-890c-dcebcde9f6e4"
const FORMATIC_KEY = "pk_live_F937DF033A1666BF"

// const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
// const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
// const PORTIS_ID = process.env.REACT_APP_PORTIS_ID
const WALLETCONNECT_BRIDGE_URL = process.env.REACT_APP_WALLETCONNECT_BRIDGE_URL

export const NETWORK_CHAIN_ID: number = parseInt(CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: WALLETCONNECT_BRIDGE_URL,
  qrcode: true,
  pollingInterval: 15000
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl: UNISWAP_LOGO_URL
})
