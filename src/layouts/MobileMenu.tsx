import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Button, Divider, IconButton, List, SvgIcon, Typography } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';

import { DrawerWrapper } from './components/DrawerWrapper';
import { LanguagesList } from './components/LanguageSwitcher';
import { NavItems } from './components/NavItems';

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  headerHeight: number;
}

const MenuItemsWrapper = ({ children, title }: { children: ReactNode; title: ReactNode }) => (
  <Box sx={{ mb: 6, '&:last-of-type': { mb: 0, '.MuiDivider-root': { display: 'none' } } }}>
    <Box sx={{ px: 2 }}>
      <Typography variant="subheader2" sx={{ color: '#A5A8B6', px: 4, py: 2 }}>
        {title}
      </Typography>

      {children}
    </Box>

    <Divider sx={{ borderColor: '#F2F3F729', mt: 6 }} />
  </Box>
);

// Custom MobileCloseButton component
const MobileCloseButton = ({ setOpen }: { setOpen: (value: boolean) => void }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 16,
      right: 16,
      zIndex: 1300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <IconButton
      onClick={() => setOpen(false)}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#F1F1F3',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        width: 40,
        height: 40,
      }}
    >
      <SvgIcon>
        <XIcon />
      </SvgIcon>
    </IconButton>
  </Box>
);

export const MobileMenu = ({ open, setOpen, headerHeight }: MobileMenuProps) => {
  const [isLanguagesListOpen, setIsLanguagesListOpen] = useState(false);

  useEffect(() => setIsLanguagesListOpen(false), [open]);

  return (
    <>
      {open ? (
        <MobileCloseButton setOpen={setOpen} />
      ) : (
        <Button
          id="settings-button-mobile"
          sx={{ p: '7px 8px', minWidth: 'unset', ml: 2 }}
          onClick={() => setOpen(true)}
        >
          <SvgIcon sx={{ color: '#F1F1F3' }} fontSize="small">
            <MenuIcon />
          </SvgIcon>
        </Button>
      )}

      <DrawerWrapper open={open} setOpen={setOpen} headerHeight={headerHeight}>
        {/* Header with close button inside drawer */}
        {open && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: '1px solid rgba(242, 243, 247, 0.16)',
            }}
          >
            <Typography
              variant="subheader1"
              sx={{ color: '#F1F1F3', paddingLeft: 4, fontSize: 20 }}
            >
              <Trans>Menu</Trans>
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                color: '#F1F1F3',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <SvgIcon>
                <XIcon />
              </SvgIcon>
            </IconButton>
          </Box>
        )}

        {!isLanguagesListOpen ? (
          <>
            <MenuItemsWrapper title={''}>
              <NavItems setOpen={setOpen} />
            </MenuItemsWrapper>
          </>
        ) : (
          <Box>
            {/* Back button for language list */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid rgba(242, 243, 247, 0.16)',
              }}
            >
              <Typography variant="subheader1" sx={{ color: '#F1F1F3' }}>
                <Trans>Language</Trans>
              </Typography>
              <IconButton
                onClick={() => setIsLanguagesListOpen(false)}
                sx={{
                  color: '#F1F1F3',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <SvgIcon>
                  <XIcon />
                </SvgIcon>
              </IconButton>
            </Box>
            <List sx={{ px: 2 }}>
              <LanguagesList onClick={() => setIsLanguagesListOpen(false)} />
            </List>
          </Box>
        )}
      </DrawerWrapper>
    </>
  );
};
