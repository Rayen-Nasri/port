"use client";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { NavBar } from "./NavBar"
import { HomePage } from "./HomePage";
import { Spotlight } from "@/components/ui/spotlight";
import { Cards } from "./Cards";
import { useEffect } from "react";
import { Projects } from "./Projects";
import { Ipad } from "./Ipad";



export const LandingPage = () => {
    // useEffect(() => {
    //   window.scrollTo(0,0)
    // }, [])

    return (
        <>
            <div className="absolute  h-screen w-screen ">
                <Spotlight
                    className="-top-40 left-0 md:-top-20 md:left-60"
                    fill="white"
                />
            </div>
            <div className="relative z-50 bg-transparent ">
                <NavBar />
            </div>
            <br />

            <TracingBeam>
                <div className="ml-20">
                    <HomePage />
                    <Cards />
                    {/* <Projects/> */}
                    <div className="z-[10] relative">
                        <Ipad />
                    </div>
                </div>

            </TracingBeam>
        </>
    )
}