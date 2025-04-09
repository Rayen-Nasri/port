"use client";
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const LandingPage = dynamic(
  () => import('./landingPage/LandingPage').then(mod => mod.LandingPage),
  {
    ssr: true,
    loading: () => <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800" />
  }
)

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800" />}>
      <LandingPage />
    </Suspense>
  )
}
