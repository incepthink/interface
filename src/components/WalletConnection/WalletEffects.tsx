// src/components/common/WalletEffects.tsx
'use client';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';

interface WalletEffectsProps {
  /** Persist the connector ID (e.g. 'metamask', 'walletConnect') */
  setWalletType: (walletType: string) => void;
  /** Clear any wallet-related storage on disconnect */
  cleanLocalStorage: () => void;
}

export const WalletEffects: React.FC<WalletEffectsProps> = ({
  setWalletType,
  cleanLocalStorage,
}) => {
  const { isConnected, connector, status } = useAccount();

  /* ───────── run when a wallet connects ───────── */
  useEffect(() => {
    if (isConnected && connector?.id) {
      setWalletType(connector.id);
    }
  }, [isConnected, connector, setWalletType]);

  /* ───────── run when a wallet disconnects ────── */
  useEffect(() => {
    if (!isConnected) {
      cleanLocalStorage();
    }
  }, [isConnected, status, cleanLocalStorage]);

  return null; // No UI
};
