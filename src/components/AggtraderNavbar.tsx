'use client';

import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return <a href={href}>{children}</a>;
}

const navItems = [
  { href: '/spot', label: 'Spot' },
  { href: 'https://lending.aggtrade.xyz/', label: 'Lend/Borrow' },
  { href: 'https://perp.aggtrade.xyz/', label: 'Perps' },
  { href: 'https://yield.aggtrade.xyz/', label: 'Yield Farming' },
  { href: '/profile', label: 'Account' },
];

export default function AggtraderNavbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar__logo">AggTrade</h2>
      <ul className="navbar__list">
        {navItems.map(({ href, label }) => (
          <li key={href} className="navbar__item">
            <NavLink href={href}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
