"use client";
import dynamic from 'next/dynamic';
import './SkillsShowcase.css';
import { Spotlight } from '@/components/ui/spotlight-new';


const LoadingScreen = dynamic(() => import('./LoadingScreen').then(mod => mod.LoadingScreen), {
    ssr: false,
});

const ScrollSystem = dynamic(() => import('./ScrollSystem').then(mod => mod.ScrollSystem), {
    ssr: false,
});

export const LandingPage = () => {
    return (
        <>
            <div className="absolute h-screen w-screen">
                <Spotlight />
            </div>
            <LoadingScreen>
                <ScrollSystem />
            </LoadingScreen>
        </>
    );
};