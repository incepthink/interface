import { XIcon } from '@heroicons/react/outline';
import { Box, IconButton, Modal, Paper, SvgIcon } from '@mui/material';
import React from 'react';

export interface BasicModalProps {
  open: boolean;
  children: React.ReactNode;
  setOpen: (value: boolean) => void;
  withCloseButton?: boolean;
  contentMaxWidth?: number;
  contentHeight?: number;
  closeCallback?: () => void;
  disableEnforceFocus?: boolean;
  BackdropProps?: object;
}

export const BasicModal = ({
  open,
  setOpen,
  withCloseButton = true,
  contentMaxWidth = 420,
  contentHeight,
  children,
  closeCallback,
  disableEnforceFocus,
  BackdropProps,
  ...props
}: BasicModalProps) => {
  const handleClose = () => {
    if (closeCallback) closeCallback();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableEnforceFocus={disableEnforceFocus} // Used for wallet modal connection
      BackdropProps={BackdropProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '.MuiPaper-root': {
          outline: 'none',
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...props}
      data-cy={'Modal'}
    >
      <Paper
        sx={{
          position: 'relative',
          margin: '10px',
          overflowY: 'auto',
          width: '100%',
          maxWidth: { xs: '359px', xsm: `${contentMaxWidth}px` },
          height: contentHeight ? `${contentHeight}px` : 'auto',
          maxHeight: contentHeight ? `${contentHeight}px` : 'calc(100vh - 20px)',
          p: 6,
          boxShadow: '0px 4px 34px rgba(0, 255, 233, 0.4)',
        }}
      >
        {children}

        {withCloseButton && (
          <Box sx={{ position: 'absolute', top: '24px', right: '50px', zIndex: 5 }}>
            <IconButton
              sx={{
                borderRadius: '50%',
                p: 0,
                minWidth: 0,
                position: 'absolute',
                bgcolor: 'background.paper',
              }}
              onClick={handleClose}
              data-cy={'close-button'}
            >
              <SvgIcon sx={{ fontSize: '28px', color: 'text.primary' }}>
                <XIcon data-cy={'CloseModalIcon'} />
              </SvgIcon>
            </IconButton>
          </Box>
        )}
      </Paper>
    </Modal>
  );
};
