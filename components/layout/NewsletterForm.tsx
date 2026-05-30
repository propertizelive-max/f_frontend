'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  if (submitted) {
    return (
      <p className="text-sm text-white/55 leading-relaxed">
        Thanks for subscribing! Check your inbox soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="w-full px-4 py-2.5 bg-white/8 border border-white/18 rounded text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/45 transition-colors"
      />
      <button
        type="submit"
        className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium rounded transition-colors cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  )
}
