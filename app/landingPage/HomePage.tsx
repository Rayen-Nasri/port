"use client";
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';




export const HomePage = memo(() => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <>
            <div className='grid'>
                <section className="text-white flex md:h-screen lg:relative lg:bottom-20 w-screen h-screen overflow-hidden">
                    {/* Enhanced animated background elements */}
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full bg-[#8158C9] opacity-15 blur-[120px] -z-10"
                        animate={{
                            x: mousePosition.x * 0.05,
                            y: mousePosition.y * 0.05,
                            scale: [1, 1.1, 1],
                            opacity: [0.15, 0.2, 0.15]
                        }}
                        transition={{ 
                            x: { type: "spring", stiffness: 50, damping: 30 },
                            y: { type: "spring", stiffness: 50, damping: 30 },
                            scale: { duration: 8, repeat: Infinity },
                            opacity: { duration: 8, repeat: Infinity }
                        }}
                        style={{ left: '20%', top: '30%' }}
                    />
                    <motion.div
                        className="absolute w-[300px] h-[300px] rounded-full bg-blue-500 opacity-15 blur-[100px] -z-10"
                        animate={{
                            x: mousePosition.x * -0.03,
                            y: mousePosition.y * -0.03,
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.25, 0.15]
                        }}
                        transition={{ 
                            x: { type: "spring", stiffness: 40, damping: 20 },
                            y: { type: "spring", stiffness: 40, damping: 20 },
                            scale: { duration: 10, repeat: Infinity },
                            opacity: { duration: 10, repeat: Infinity }
                        }}
                        style={{ right: '25%', bottom: '20%' }}
                    />
                    <motion.div
                        className="absolute w-[250px] h-[250px] rounded-full bg-purple-600 opacity-10 blur-[90px] -z-10"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ 
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ left: '60%', top: '20%' }}
                    />

                    <div className="w-full flex my-auto h-full">
                        <motion.div
                            className="flex flex-col justify-center space-y-5 md:space-y-7 text-center mx-auto relative z-10"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <motion.p
                                    className="uppercase font-light tracking-wider text-[14px] md:text-[16px] text-gray-300"
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <TypeAnimation
                                        sequence={[
                                            'Crafting Modern Web Experiences',
                                            2000,
                                            'Building Scalable Solutions',
                                            2000,
                                            'Creating Engaging Interfaces',
                                            2000
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </motion.p>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h1 className="text-[32px] md:text-[42px] xl:text-[60px] 2xl:text-[64px] font-bold leading-tight text-white">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                    >
                                        Transforming Concepts into
                                    </motion.span>
                                    <motion.span
                                        className="block"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                    >
                                        Seamless {' '}
                                        <motion.span
                                            className="bg-gradient-to-r from-[#8158C9] to-[#5e3d9c] bg-clip-text text-transparent"
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            User Experiences
                                        </motion.span>
                                    </motion.span>
                                </h1>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <motion.p
                                    className="text-base md:text-lg text-gray-300 relative inline-block"
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    Hi! I'm Rayen, a passionate Full Stack Developer crafting digital solutions from Tunisia. 🚀
                                    <motion.span
                                        className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#8158C9] to-transparent"
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.p>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="pt-6"
                            >
                                <motion.button
                                    className="px-6 py-3 bg-gradient-to-r from-[#8158C9] to-[#5e3d9c] rounded-full text-white font-medium"
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(129, 88, 201, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    Explore My Work
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

            </div>

        </>
    )
})