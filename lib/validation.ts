const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Email is required'
  if (!EMAIL_RE.test(value)) return 'Please enter a valid email address'
  return null
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Password must be at least 8 characters'
  return null
}

export function validateRegisterPassword(value: string): string | null {
  const base = validatePassword(value)
  if (base) return base
  if (!/[a-zA-Z]/.test(value)) return 'Password must contain at least one letter'
  if (!/[0-9]/.test(value)) return 'Password must contain at least one number'
  return null
}

export function validateFullName(value: string): string | null {
  if (!value.trim()) return 'Full name is required'
  if (value.trim().length < 3) return 'Name must be at least 3 characters'
  return null
}
