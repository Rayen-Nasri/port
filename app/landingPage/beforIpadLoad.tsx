import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";


export const IpadLoad = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(() => {
        if (typeof window !== 'undefined') {
            return !sessionStorage.getItem('ipadLoadShown');
        }
        return true;
    });

    useEffect(() => {
        if (!loading) return;
        
        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('ipadLoadShown', 'true');
        }, 3700);

        return () => {
            clearTimeout(timer);
        };
    }, [loading]);
    return (

        <AnimatePresence mode="wait">
            {loading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <motion.h1
                        className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
                        animate={{
                            textShadow: "0 0 10px rgba(129,88,201,0.5)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                    >
                        <TypeAnimation
                            sequence={[
                                ' Im happy to share some of my skills',
                                3000,

                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </motion.h1>

                </motion.div>
            ) : (

                <div>{children}</div>
            )}
        </AnimatePresence>

    )
}