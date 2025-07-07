import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
  IconButton,
} from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { useModalContext } from 'src/hooks/useModal';
import { PROD_ENV } from 'src/utils/marketsAndNetworksConfig';

import { Link } from '../components/primitives/Link';
import { moreNavigation } from '../ui-config/menu-items';
import { DarkModeSwitcher } from './components/DarkModeSwitcher';
import { DrawerWrapper } from './components/DrawerWrapper';
import { LanguageListItem, LanguagesList } from './components/LanguageSwitcher';
import { NavItems } from './components/NavItems';
import { TestNetModeSwitcher } from './components/TestNetModeSwitcher';

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
  const { i18n } = useLingui();
  const [isLanguagesListOpen, setIsLanguagesListOpen] = useState(false);
  const { openReadMode } = useModalContext();

  useEffect(() => setIsLanguagesListOpen(false), [open]);

  const handleOpenReadMode = () => {
    setOpen(false);
    openReadMode();
  };

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
            <Typography variant="subheader1" sx={{ color: '#F1F1F3' }}>
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
            <MenuItemsWrapper title={<Trans>Menu</Trans>}>
              <NavItems setOpen={setOpen} />
            </MenuItemsWrapper>
            <MenuItemsWrapper title={<Trans>Global settings</Trans>}>
              <List>
                <DarkModeSwitcher />
                {PROD_ENV && <TestNetModeSwitcher />}
                <LanguageListItem onClick={() => setIsLanguagesListOpen(true)} />
              </List>
            </MenuItemsWrapper>
            <MenuItemsWrapper title={<Trans>Links</Trans>}>
              <List>
                <ListItem sx={{ cursor: 'pointer', color: '#F1F1F3' }} onClick={handleOpenReadMode}>
                  <ListItemText>
                    <Trans>Watch wallet</Trans>
                  </ListItemText>
                </ListItem>
                <ListItem
                  sx={{ color: '#F1F1F3' }}
                  component={Link}
                  href={'/staking'}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText>
                    <Trans>Safety Module</Trans>
                  </ListItemText>
                </ListItem>
                <ListItem
                  sx={{ color: '#F1F1F3' }}
                  component={Link}
                  href={'/v3-migration'}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText>
                    <Trans>Migrate to Aave V3</Trans>
                  </ListItemText>
                </ListItem>
                {moreNavigation.map((item, index) => (
                  <ListItem component={Link} href={item.link} sx={{ color: '#F1F1F3' }} key={index}>
                    <ListItemIcon sx={{ minWidth: 'unset', mr: 3 }}>
                      <SvgIcon sx={{ fontSize: '20px', color: '#F1F1F3' }}>{item.icon}</SvgIcon>
                    </ListItemIcon>

                    <ListItemText>{i18n._(item.title)}</ListItemText>
                  </ListItem>
                ))}
              </List>
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
