// src/lib/wagmiConfig.ts
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  ENABLE_TESTNET,
  FORK_BASE_CHAIN_ID,
  FORK_CHAIN_ID,
  FORK_ENABLED,
  FORK_RPC_URL,
  networkConfigs,
} from 'src/utils/marketsAndNetworksConfig';
import type { Chain } from 'viem';
import { http } from 'wagmi';

import { prodNetworkConfig, testnetConfig } from './networksConfig';

/* ──────────────────────────────────────────────
 * Build testnet and prod chain lists
 * ────────────────────────────────────────────── */
const testnetChains = Object.values(testnetConfig).map((c) => c.wagmiChain) as [Chain, ...Chain[]];
let prodChains = Object.values(prodNetworkConfig).map((c) => c.wagmiChain) as [Chain, ...Chain[]];

/* ──────────────────────────────────────────────
 * Add fork chain if enabled
 * ────────────────────────────────────────────── */
if (FORK_ENABLED) {
  const { name, baseAssetDecimals, baseAssetSymbol } = networkConfigs[FORK_BASE_CHAIN_ID];
  const forkChain: Chain = {
    id: FORK_CHAIN_ID,
    name: `${name} Fork`,
    nativeCurrency: {
      name: baseAssetSymbol,
      symbol: baseAssetSymbol,
      decimals: baseAssetDecimals,
    },
    rpcUrls: {
      default: { http: [FORK_RPC_URL] },
    },
    testnet: false,
  };
  prodChains = [forkChain, ...prodChains];
}

/* ──────────────────────────────────────────────
 * Transport mapping per chain
 * ────────────────────────────────────────────── */
const getTransport = (chainId: number) => networkConfigs[chainId]?.publicJsonRPCUrl[0];

const buildTransports = (chains: readonly Chain[]) =>
  Object.fromEntries(chains.map((chain) => [chain.id, http(getTransport(chain.id))]));

/* ──────────────────────────────────────────────
 * Shared app config
 * ────────────────────────────────────────────── */
const appInfo = {
  appName: 'AggTrade - Lending',
  appDescription: 'Non-custodial liquidity protocol',
  appUrl: 'https://yield.aggtrade.xyz/',
  appIcon: 'https://avatars.githubusercontent.com/u/47617460?s=200&v=4',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
};

/* ──────────────────────────────────────────────
 * Custom wallet connectors with Phantom support
 * ────────────────────────────────────────────── */
// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Popular',
//       wallets: [
//         metaMaskWallet,
//         rainbowWallet,
//         coinbaseWallet,
//         phantomWallet, // Add Phantom wallet
//       ],
//     },
//     {
//       groupName: 'Other',
//       wallets: [
//         walletConnectWallet, // This will help mobile Phantom users connect
//         injectedWallet,
//       ],
//     },
//   ],
//   appInfo
// );

/* ──────────────────────────────────────────────
 * Main config used for production - using getDefaultConfig for compatibility
 * ────────────────────────────────────────────── */
const prodConfig = getDefaultConfig({
  ...appInfo,
  chains: ENABLE_TESTNET ? testnetChains : prodChains,
  transports: ENABLE_TESTNET ? undefined : buildTransports(prodChains),
  wallets: [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet, phantomWallet],
    },
    {
      groupName: 'Other',
      wallets: [walletConnectWallet, injectedWallet],
    },
  ],
  ssr: true,
});

/* ──────────────────────────────────────────────
 * Optional Cypress-only config with fork only
 * ────────────────────────────────────────────── */
const isCypressEnabled = process.env.NEXT_PUBLIC_IS_CYPRESS_ENABLED === 'true';

const cypressConfig = getDefaultConfig({
  ...appInfo,
  chains: [prodChains[0]], // forkChain
  transports: buildTransports([prodChains[0]]),
  wallets: [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet, phantomWallet],
    },
    {
      groupName: 'Other',
      wallets: [walletConnectWallet, injectedWallet],
    },
  ],
  ssr: true,
});

/* ──────────────────────────────────────────────
 * Final export
 * ────────────────────────────────────────────── */
export const wagmiConfig = isCypressEnabled ? cypressConfig : prodConfig;
