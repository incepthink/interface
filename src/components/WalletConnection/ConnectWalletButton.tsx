// src/components/ConnectWalletButton.tsx
'use client';

import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRootStore } from 'src/store/root';
import { AUTH } from 'src/utils/events';

import { AvatarSize } from '../Avatar';
import { UserDisplay } from '../UserDisplay';

export interface ConnectWalletProps {
  funnel?: string;
  /** optional callback while the modal is opening/closing */
  onIsConnecting?: (isConnecting: boolean) => void;
  /** optional extra click handler */
  onClick?: () => void;
}

export const ConnectWalletButton: React.FC<ConnectWalletProps> = ({
  funnel,
  onIsConnecting,
  onClick,
}) => {
  const trackEvent = useRootStore((s) => s.trackEvent);

  return (
    <ConnectButton.Custom>
      {({ account, mounted, openAccountModal, openConnectModal, authenticationStatus }) => {
        const isReady = mounted && authenticationStatus !== 'loading';
        const isConnected = isReady && !!account;

        const handleClick = async () => {
          onClick?.();
          trackEvent(AUTH.CONNECT_WALLET, { funnel });

          // notify parent that a connection flow is starting
          onIsConnecting?.(true);

          try {
            if (isConnected) {
              await openAccountModal();
            } else {
              await openConnectModal();
            }
          } finally {
            // modal closed (connected or cancelled)
            onIsConnecting?.(false);
          }
        };

        return (
          <Button
            sx={{
              backgroundColor: '#00F5E0',
              color: 'black',
              '&:hover': {
                backgroundColor: '#00FAFF',
                color: '#000',
                boxShadow: '0 0 8px #00FAFF',
              },
            }}
            onClick={handleClick}
          >
            {isConnected ? (
              <UserDisplay
                avatarProps={{ size: AvatarSize.SM }}
                oneLiner
                titleProps={{ variant: 'buttonM' }}
              />
            ) : (
              <Trans>Connect wallet</Trans>
            )}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
