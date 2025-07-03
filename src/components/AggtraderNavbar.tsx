'use client';

import { Button } from '@mui/material';
import React from 'react';
import { AvatarSize } from 'src/components/Avatar';
import { UserDisplay } from 'src/components/UserDisplay';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <a
      href={href}
      style={{
        position: 'relative',
        padding: '4px 8px',
        fontSize: '1.25rem',
        textDecoration: 'none',
        color: `${href === '#' ? '#00ffe9' : 'white'}`,
        transition: 'color 0.2s',
        ...(isActive ? {} : {}),
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
  { href: '#', label: 'Lend/Borrow' },
  { href: 'https://perp.aggtrade.xyz/', label: 'Perps' },
  { href: 'https://yield.aggtrade.xyz/', label: 'Yield Farming' },
  { href: 'https://aggtrade.xyz/profile', label: 'Account' },
];

export default function AggtraderNavbar() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const { readOnlyMode } = useWeb3Context();
  const { openReadMode } = useModalContext();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        backgroundColor: 'rgb(5, 14, 25)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ width: '40px' }}>
          <img src="/aggtrade.png" alt="" style={{ width: '100%', objectFit: 'cover' }} />
        </div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            margin: 0,
            cursor: 'pointer',
            color: 'white',
          }}
        >
          AggTrade
        </h2>
      </div>
      <ul
        style={{
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
      </ul>
      {readOnlyMode ? (
        <Button
          variant="surface"
          onClick={() => {
            openReadMode();
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
      )}
    </nav>
  );
}
