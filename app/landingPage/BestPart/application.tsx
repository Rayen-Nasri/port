"use client"
import Image from "next/image"
import flappy from "../../../public/flappy.png"
import note from "../../../public/note.png"
import setting from "../../../public/appleSetting.png"
import Messages from "../../../public/Messages.png"
import appStore from "../../../public/appStore.png"
import photo from "../../../public/photo.png"
import { motion } from 'framer-motion'
import Game from '../FlappyBird/Game'
import { useState } from "react"

const applications = [
    { src: setting, alt: "Settings", class: "rounded-2xl" },
    { src: Messages, alt: "Messages", class: "rounded-2xl" },
    { src: appStore, alt: "App Store", class: "rounded-2xl" },
    { src: photo, alt: "Photos", class: "rounded-2xl" },
    { src: flappy, alt: "Flappy Bird", class: "rounded-2xl" },
    { src: note, alt: "Notes", class: "rounded-2xl" },
]

export const Application = () => {
    const [showFlappyBird, setShowFlappyBird] = useState(false);

    const handleAppClick = (appName: string) => {
        if (appName === "Flappy Bird") {
            setShowFlappyBird(true);
        }
    };

    if (showFlappyBird) {
        return (
            <div className="fixed inset-0  bg-black ">
                <button 
                    onClick={() => setShowFlappyBird(false)}
                    className="absolute top-4 right-4 z-50 bg-white/50 text-gray-700 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                    Exit
                </button>
                <div className="flex items-center justify-center h-screen">
                    <Game />
                </div>
            </div>
        );
    }

    return (
        <section className="py-8">
            <div className="grid grid-cols-3 md:grid-row-1 md:grid-cols-6 gap-6 place-items-center">
                {applications.map((app, index) => (
                    <motion.button
                        key={index}
                        className="p-3 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.1 * index,
                            duration: 0.5,
                            damping: 10
                        }}
                        whileHover={{ scale: 1.05, transition: { delay: 0 } }}
                        whileTap={{ scale: 0.95, transition: { delay: 0 } }}
                        onClick={() => handleAppClick(app.alt)}
                    >
                        <Image
                            src={app.src}
                            alt={app.alt}
                            width={65}
                            className={`${app.class} transition-transform`}
                        />
                    </motion.button>
                ))}
            </div>
        </section>
    )
}