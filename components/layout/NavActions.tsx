'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react'
import type { NavLink } from '@/types/navigation'
import { useAuth } from '@/context/AuthContext'
import { useCartStore } from '@/store/cart.store'
import { UserDropdown } from '@/components/auth/UserDropdown'

type NavActionsProps = {
  navLinks: NavLink[]
}

export function NavActions({ navLinks }: NavActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, isLoading, user } = useAuth()
  const count = useCartStore((s) => s.cartCount)
  const router = useRouter()

  function handleCartClick() {
    router.push('/checkout')
  }

  return (
    <>
      <div className="flex items-center gap-4 text-charcoal">
        <button
          aria-label="Search"
          className="hover:text-accent transition-colors cursor-pointer"
        >
          <Search size={18} />
        </button>
        <button
          aria-label="Wishlist"
          className="hover:text-accent transition-colors cursor-pointer"
        >
          <Heart size={18} />
        </button>
        <button
          aria-label={`Cart${count > 0 ? `, ${count} items` : ''}`}
          onClick={handleCartClick}
          className="relative hover:text-accent transition-colors cursor-pointer"
        >
          <ShoppingBag size={18} />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </button>

        {!isLoading && (
          isAuthenticated ? (
            <UserDropdown />
          ) : (
            <Link
              href="/login"
              aria-label="Login"
              className="hover:text-accent transition-colors"
            >
              <User size={18} />
            </Link>
          )
        )}

        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden hover:text-accent transition-colors cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          className="absolute top-16 inset-x-0 bg-white border-b border-border px-6 pb-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-5 pt-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-charcoal hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => { setMenuOpen(false); handleCartClick() }}
                className="text-sm text-charcoal hover:text-accent transition-colors flex items-center gap-2"
              >
                Cart
                {count > 0 && (
                  <span className="bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            </li>
            {!isLoading && (
              <li className="border-t border-border pt-4">
                {isAuthenticated ? (
                  <span className="text-sm text-charcoal font-medium">{user?.name}</span>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-charcoal hover:text-accent transition-colors"
                  >
                    Login
                  </Link>
                )}
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
