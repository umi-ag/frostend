'use client';

import { AppBar } from 'src/components/AppBar'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-blue-500">
      <AppBar />
      <main className="flex justify-center mt-[120px] flex-wrap">
        {children}
      </main>
    </div>
  )
}
