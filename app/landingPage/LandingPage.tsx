"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingScreen } from './LoadingScreen';



const TracingBeam = dynamic(
    () => import("@/components/ui/tracing-beam").then(mod => mod.TracingBeam),
    { 
        ssr: true,
        loading: () => <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800" />
    }
);

const Spotlight = dynamic(
    () => import("@/components/ui/spotlight").then(mod => mod.Spotlight),
    { 
        ssr: true,
        loading: () => null
    }
);

const NavBar = dynamic(() => import('./NavBar').then(mod => mod.NavBar), {
    ssr: true,
    loading: () => <div className="h-16 bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse" />
});

const HomePage = dynamic(() => import('./HomePage').then(mod => mod.HomePage), {
    ssr: true,
    loading: () => <div className="min-h-[70vh] bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse" />
});

const Cards = dynamic(() => import('./Cards').then(mod => mod.Cards), {
    ssr: true,
    loading: () => <div className="min-h-[400px] bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse" />
});

const Ipad = dynamic(() => import('./Ipad').then(mod => mod.Ipad), {
    ssr: true,
    loading: () => <div className="min-h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse" />
});

export const LandingPage = () => {
    return (
        // <LoadingScreen>
        //     <div className="absolute h-screen w-screen">
        //         <Spotlight
        //             className="-top-40 left-0 md:-top-20 md:left-60"
        //             fill="white"
        //         />
        //     </div>
        //     <div className="relative z-50 bg-transparent">
        //         <Suspense fallback={<div className="h-16 bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse" />}>
        //             <NavBar />
        //         </Suspense>
        //     </div>
        //     <br />

        //     <TracingBeam>
        //         <div className="ml-20">
        //             <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 animate-pulse" />}>
        //                 <HomePage />
        //                 <Cards />
                        <Ipad />
            //         </Suspense>
            //     </div>
            // </TracingBeam>
        // </LoadingScreen>
    );
};