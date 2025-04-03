"use client";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { NavBar } from "./NavBar"
import { HomePage } from "./HomePage";
import { Spotlight } from "@/components/ui/spotlight";
import { Cards } from "./Cards";
import { useEffect } from "react";



export const LandingPage = () => {
    useEffect(() => {
      window.scrollTo(0,0)
    }, [])
    
    return (
        <>
            <div className="absolute inset-0 h-screen w-screen ">
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
                <div className="ml-20 z-20 ">
                    <HomePage />
                    <Cards/>
                </div>

            </TracingBeam>
        </>
    )
}