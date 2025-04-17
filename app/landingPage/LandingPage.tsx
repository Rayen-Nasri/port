"use client";
import dynamic from 'next/dynamic';
import './SkillsShowcase.css';
import { Spotlight } from '@/components/ui/spotlight-new';
import { LoadingScreen } from './LoadingScreen';




const ScrollSystem = dynamic(() => import('./ScrollSystem').then(mod => mod.ScrollSystem), {
    ssr: true,
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