// src/components/ConnectWalletPaper.tsx
'use client';

import { Trans } from '@lingui/macro';
import { CircularProgress, Paper, PaperProps, Typography } from '@mui/material';
import { useState } from 'react';

import { ConnectWalletButton } from './WalletConnection/ConnectWalletButton';

interface ConnectWalletPaperProps extends PaperProps {
  /** Optional text under the headline */
  description?: React.ReactNode;
}

export const ConnectWalletPaper: React.FC<ConnectWalletPaperProps> = ({
  description,
  sx,
  ...rest
}) => {
  /* Track whether the RainbowKit modal is currently open */
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <Paper
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 10,
        flex: 1,
        backgroundColor: 'transparent',
        boxShadow: 'inset 0px 4px 34px rgba(0, 255, 233, 0.4)',
        ...sx,
      }}
    >
      {isConnecting ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h2" sx={{ mb: 2 }}>
            <Trans>Please, connect your wallet</Trans>
          </Typography>

          <Typography sx={{ mb: 6 }} color="text.secondary">
            {description || (
              <Trans>
                Please connect your wallet to see your supplies, borrowings, and open positions.
              </Trans>
            )}
          </Typography>

          {/* Pass the state setter so the button can report modal open/close */}
          <ConnectWalletButton onIsConnecting={setIsConnecting} />
        </>
      )}
    </Paper>
  );
};
