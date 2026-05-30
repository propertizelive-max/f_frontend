'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { logoutUser } from '@/services/authService'
import { toast } from '@/hooks/useToast'

export function UserDropdown() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    setOpen(false)
    await logoutUser()
    logout()
    toast('Logged out successfully')
    router.push('/')
  }

  const firstName = user?.name?.split(' ')[0] ?? 'Account'

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-charcoal hover:text-accent transition-colors cursor-pointer"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          <User size={18} />
        )}
        <span className="hidden sm:inline text-xs font-medium tracking-wide">{firstName}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-border shadow-lg z-50 py-1">
          {MENU_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-charcoal hover:bg-surface hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="h-px bg-border mx-4 my-1" />
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-surface hover:text-accent transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

const MENU_ITEMS = [
  { label: 'My Profile', href: '/profile' },
  { label: 'My Orders', href: '/orders' },
  { label: 'My Cart', href: '/cart' },
]
