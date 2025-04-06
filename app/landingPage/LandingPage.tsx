"use client";
import dynamic from 'next/dynamic';
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Spotlight } from "@/components/ui/spotlight";
import { useEffect } from 'react';

// SSR
const NavBar = dynamic(() => import('./NavBar').then(mod => mod.NavBar), {
    ssr: true,
    loading: () => <div className="h-16" />
})

const HomePage = dynamic(() => import('./HomePage').then(mod => mod.HomePage), {
    ssr: true,
    loading: () => <div className="min-h-screen animate-pulse bg-gray-800/20" />
})

//  CSR (loaded only on client)
const Cards = dynamic(() => import('./Cards').then(mod => mod.Cards), {
    ssr: true,
    loading: () => <div className="min-h-[400px] animate-pulse bg-gray-800/20" />
})

const Ipad = dynamic(() => import('./Ipad').then(mod => mod.Ipad), {
    ssr: true,
    loading: () => <div className="min-h-[600px] animate-pulse bg-gray-800/20" />,
})

// UI components that should be SSR
const TracingBeamClient = dynamic(() => import('@/components/ui/tracing-beam').then(mod => mod.TracingBeam), {
    ssr: true
})

const SpotlightClient = dynamic(() => import('@/components/ui/spotlight').then(mod => mod.Spotlight), {
    ssr: true
})

// Preload critical components
const preloadComponents = () => {
    const components = ['./NavBar', './HomePage'];
    components.forEach(component => {
        import(component);
    });
};

export const LandingPage = () => {
    useEffect(() => {
        preloadComponents();
    }, []);

    return (
        <>
            <div className="absolute h-screen w-screen">
                <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60"
                    fill="white"
                />
            </div>
            <div className="relative z-50 bg-transparent">
                <NavBar />
            </div>
            <br />

            <TracingBeam>
                <div className="ml-20">
                    <HomePage />
                    <Cards />
                    {/* <Projects/> */}
                    <div className="relative">
                        <Ipad />
                    </div>
                </div>
            </TracingBeam>
        </>
    )
}