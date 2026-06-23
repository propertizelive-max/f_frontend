'use client'

import { LogOut } from 'lucide-react'
import { useProfile } from '@/features/auth/hooks/useProfile'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { toast } from '@/hooks/useToast'
import { extractApiErrorMessage } from '@/lib/api/error'
import type { User } from '@/types/auth.types'

function getProvider(user: User): string {
  const raw = user.provider ?? (user.googleId ? 'google' : 'local')
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function formatJoinDate(iso?: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function ProfileClient() {
  const { data: user, isLoading, isError, error, refetch, isFetching } = useProfile()
  const { logout } = useLogout()

  function handleLogout() {
    logout()
    toast('Logged out successfully')
  }

  if (isLoading) {
    return (
      <Container className="py-20 flex justify-center">
        <Loader size="lg" />
      </Container>
    )
  }

  if (isError || !user) {
    return (
      <Container className="py-20 text-center">
        <p className="text-sm text-red-500 mb-4">
          {error ? extractApiErrorMessage(error) : 'Failed to load profile. Please try again.'}
        </p>
        <Button variant="outline" onClick={() => refetch()} isLoading={isFetching}>
          Retry
        </Button>
      </Container>
    )
  }

  const initial = user.name?.trim().charAt(0).toUpperCase() || '?'
  const joinDate = formatJoinDate(user.createdAt)

  return (
    <Container className="py-10 max-w-2xl">
      <h1 className="font-display text-2xl lg:text-3xl font-medium text-charcoal mb-8">
        My Profile
      </h1>

      <div className="border border-border bg-white p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {user.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.picture}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-display font-medium shrink-0">
              {initial}
            </div>
          )}

          <div className="min-w-0">
            <p className="font-display text-lg font-medium text-charcoal truncate">{user.name}</p>
            <p className="text-sm text-muted truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              {/* <Badge label={user.role} variant="accent" /> */}
              <Badge label={getProvider(user)} variant="default" />
              {/* <Badge label={"Google"} variant="default" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border bg-white p-6 mb-6">
        <h2 className="text-[10px] uppercase tracking-[0.15em] text-muted mb-4">
          Account Information
        </h2>
        <dl className="divide-y divide-border">
          <ProfileRow label="Name" value={user.name} />
          <ProfileRow label="Email" value={user.email} />
          {/* <ProfileRow label="Role" value={user.role} /> */}
          <ProfileRow label="Provider" value={getProvider(user)} />
          {/* <ProfileRow label="Provider" value="Google" /> */}
          {joinDate && <ProfileRow label="Account Created" value={joinDate} />}
        </dl>
      </div>

      <Button variant="outline" fullWidth onClick={handleLogout}>
        <LogOut size={14} className="mr-2" />
        Logout
      </Button>
    </Container>
  )
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-sm font-medium text-charcoal">{value}</dd>
    </div>
  )
}
