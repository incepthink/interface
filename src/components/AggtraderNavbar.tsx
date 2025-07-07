'use client';

import {
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { AvatarSize } from 'src/components/Avatar';
import { UserDisplay } from 'src/components/UserDisplay';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, isActive, isMobile, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      style={{
        position: 'relative',
        padding: isMobile ? '12px 0' : '4px 8px',
        fontSize: isMobile ? '1.1rem' : '1.25rem',
        textDecoration: 'none',
        color: `${href === '#' ? '#00ffe9' : 'white'}`,
        transition: 'color 0.2s',
        display: 'block',
        width: '100%',
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#00ffe9';
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.color = `${href === '#' ? '#00ffe9' : 'white'}`;
      }}
    >
      {children}
      <span
        style={{
          content: "''",
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: isActive ? '2px' : '0',
          width: '100%',
          background: 'linear-gradient(to right, #00FFE9, #003B3C)',
          transition: 'height 0.2s',
          display: 'block',
        }}
      />
    </a>
  );
}

const navItems = [
  {
    href: 'https://aggtrade.xyz/spot',
    label: 'Spot',
  },
  { href: 'https://perp.aggtrade.xyz/', label: 'Perps' },
  { href: '#', label: 'Lend/Borrow' },
  { href: 'https://yield.aggtrade.xyz/', label: 'Yield Farming' },
  { href: 'https://aggtrade.xyz/profile', label: 'Account' },
];

export default function AggtraderNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg')); // Mobile below 1200px
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const { readOnlyMode } = useWeb3Context();
  const { openReadMode } = useModalContext();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const ConnectSection = () =>
    readOnlyMode ? (
      <Button
        variant="contained"
        onClick={() => {
          openReadMode();
        }}
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid #00ffe9',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 233, 0.1)',
          },
        }}
      >
        <UserDisplay
          avatarProps={{ size: AvatarSize.SM }}
          oneLiner={true}
          titleProps={{ variant: 'buttonM' }}
        />
      </Button>
    ) : (
      <ConnectWalletButton />
    );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgb(5, 14, 25)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1100, // Lower than AppHeader's z-index
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          padding: { xs: '8px 16px', lg: '16px 40px' },
          minHeight: { xs: '64px', lg: '80px' },
        }}
      >
        {/* Logo */}
        <Box
          component="a"
          href="/"
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Box sx={{ width: { xs: '32px', lg: '40px' } }}>
            <img
              src="/aggtrade.png"
              alt="AggTrade Logo"
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Typography
            component="h2"
            sx={{
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              fontSize: { xs: '1.25rem', lg: '1.5rem' },
            }}
          >
            AggTrade
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box
            component="ul"
            sx={{
              listStyle: 'none',
              display: 'flex',
              gap: '24px',
              margin: 0,
              padding: 0,
            }}
          >
            {navItems.map(({ href, label }) => {
              const isInternal = href.startsWith('/');
              const isActive = isInternal && (pathname === href || pathname.startsWith(href));

              return (
                <li key={href} style={{ margin: 0 }}>
                  <NavLink href={href} isActive={isActive}>
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </Box>
        )}

        {/* Desktop Connect Button */}
        {!isMobile && <ConnectSection />}

        {/* Mobile Menu */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ConnectSection />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          zIndex: 1150, // Between AggtraderNavbar (1100) and AppHeader (1200+)
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'rgb(5, 14, 25)',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              pb: 2,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography
              component="h3"
              sx={{ color: 'white', fontWeight: 600, fontSize: '1.25rem' }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={handleMobileMenuClose}
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <List sx={{ p: 0 }}>
            {navItems.map(({ href, label }) => {
              const isInternal = href.startsWith('/');
              const isActive = isInternal && (pathname === href || pathname.startsWith(href));

              return (
                <ListItem key={href} sx={{ p: 0 }}>
                  <ListItemButton
                    sx={{
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 255, 233, 0.1)',
                      },
                    }}
                  >
                    <NavLink
                      href={href}
                      isActive={isActive}
                      isMobile={true}
                      onClick={handleMobileMenuClose}
                    >
                      {label}
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
