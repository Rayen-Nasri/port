"use client";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingScreen } from './LoadingScreen';



const TracingBeam = dynamic(
    () => import("@/components/ui/tracing-beam").then(mod => mod.TracingBeam),
    {
        ssr: true,
    }
);

const Spotlight = dynamic(
    {
        ssr: true,
    }
);

const NavBar = dynamic(() => import('./NavBar').then(mod => mod.NavBar), {
    ssr: true,
});

const HomePage = dynamic(() => import('./HomePage').then(mod => mod.HomePage), {
    ssr: false,
});

const Cards = dynamic(() => import('./Cards').then(mod => mod.Cards), {
    ssr: true,
});

const Ipad = dynamic(() => import('./Ipad').then(mod => mod.Ipad), {
    ssr: true,
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
        //             <NavBar />
        //     </div>
        //     <br />

        //     <TracingBeam>
        //         <div className="ml-20">
        //                 <HomePage />
        //                 <Cards />
                        <Ipad />
            //     </div>
            // </TracingBeam>
        // </LoadingScreen>
    );
};