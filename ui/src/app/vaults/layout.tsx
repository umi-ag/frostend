'use client';

import { AppBar } from 'src/components/AppBar'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AppBar />
      <main className="p-16">
        {children}
      </main>
    </div>
  )
}
