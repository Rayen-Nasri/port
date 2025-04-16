"use client";
import dynamic from 'next/dynamic';
import './SkillsShowcase.css';
import './Footer.css';



const TracingBeam = dynamic(
    () => import("@/components/ui/tracing-beam").then(mod => mod.TracingBeam),
    {
        ssr: false,
    }
);

const LoadingScreen = dynamic(
    ()=> import("./LoadingScreen").then(mod => mod.LoadingScreen) , {
        ssr : false
    }
)
const Spotlight = dynamic(
    () => import("@/components/ui/spotlight-new").then(mod => mod.Spotlight)
);

const NavBar = dynamic(() => import('./NavBar').then(mod => mod.NavBar), {
    ssr: false,
});

const HomePage = dynamic(() => import('./HomePage').then(mod => mod.HomePage), {
    ssr: false,
});

const Cards = dynamic(() => import('./Cards').then(mod => mod.Cards), {
    ssr: false,
});

const Ipad = dynamic(() => import('./Ipad').then(mod => mod.Ipad), {
    ssr: false,
});

const SkillsShowcase = dynamic(() => import('./SkillsShowcase').then(mod => mod.SkillsShowcase), {
    ssr: false,
});

const Footer = dynamic(() => import('./Footer').then(mod => mod.Footer), {
    ssr: true,
});

export const LandingPage = () => {
    return (
        <>
            {/* <LoadingScreen> */}
                <div className="absolute h-screen w-screen">
                    <Spotlight />

                </div>
                <div className="relative z-50 bg-transparent">
                    <NavBar />
                </div>
                <br />

                <TracingBeam>
                    <div className="ml-20 mr-10">
                        <HomePage />
                        <Cards />
                        <br />
                        <Ipad />
                        <SkillsShowcase />
                        <Footer />
                    </div>
                </TracingBeam>
            {/* </LoadingScreen> */}

        </>
    );
};