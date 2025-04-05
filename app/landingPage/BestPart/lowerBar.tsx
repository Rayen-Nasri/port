
"use client"
import Image from "next/image";
import setting from "../../../public/appleSetting.png";
import Messages from "../../../public/Messages.png";
import appStore from "../../../public/appStore.png";
import photo from "../../../public/photo.png";
import { motion } from 'framer-motion';

const btn = [
    { src: setting, alt: "setting" },
    { src: Messages, alt: "Messages" },
    { src: appStore, alt: "appStore" },
    { src: photo, alt: "photo" }
]
export const LowerBar = () => {
    return (
        <>
            <section className="flex  m-3 bg-white/40 rounded-[10px] p-[6]  ">
                <div className="flex justify-center space-x-2">
                    {
                        btn.map((v, _) => (
                            <motion.button
                                whileHover={{
                                    translateY: -5,
                                    transition: { duration: 0.2 } 
                                }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{
                                    y: 0, opacity: 1,
                                    transition: {
                                        delay: 0.9 + (_ * 0.2),
                                        type: "tween",
                                        stiffness: 200,
                                        damping: 25
                                    }
                                }}
                                key={_}>
                                <Image src={v.src} alt={v.alt} width={54} height={50} />
                            </motion.button>
                        ))
                    }
                </div>

            </section>
        </>
    )
}