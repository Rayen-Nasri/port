"use client";
import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useMemo, memo } from 'react';
import card1 from '../../public/card1.png'
import card2 from '../../public/card2.png'
import card3 from '../../public/card3.svg'

// Animation variants
const variants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1, when: "beforeChildren", ease: "easeOut" }
        }
    },
    card: {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 200, damping: 22, mass: 1.2 }
        }
    },
    content: {
        hidden: { opacity: 0, scale: 0.97 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 150, damping: 18, delay: 0.3 }
        }
    },
    image: {
        hidden: { opacity: 0, scale: 0.92 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }
        }
    }
};

const TechStackColumn = memo(({ columnIndex, techStack }: { columnIndex: number, techStack: string[] }) => (
    <div className='relative h-[250px] md:h-[380px] overflow-hidden w-1/2'>
        <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
                background: 'linear-gradient(to bottom, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0) 15%, rgba(15,15,15,0) 85%, rgba(15,15,15,0.95) 100%)'
            }}
        />
        <motion.div
            initial={{ y: columnIndex === 0 ? 0 : '-50%' }}
            animate={{ y: columnIndex === 0 ? '-50%' : '0%' }}
            transition={{
                y: {
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'mirror'
                }
            }}
            className='flex flex-col gap-4'
        >
            {techStack.map((tech, index) => (
                <div key={index} className='bg-[#1A1A1A] rounded-lg p-4 md:p-6 text-center'>
                    {tech}
                </div>
            ))}
        </motion.div>
    </div>
));

export const Cards = memo(() => {
    const techStack = useMemo(() => [
        "ReactJS", "NextJS", "Express", "MongoDB", "TypeScript",
        "Tailwind", "JavaScript", "Angular", "Bootstrap", "nodejs"
    ], []);

    const duplicatedStack = useMemo(() => [...techStack, ...techStack], [techStack]);

    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once: true, 
        amount: 0.2,
    });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Common card hover animation
    const cardHoverProps = {
        whileHover: { 
            scale: 1.01, 
            boxShadow: "0 0 20px rgba(129,88,201,0.3)",
            transition: { duration: 0.3 } 
        }
    };

    return (
        <section ref={ref}>

            <motion.div
                variants={variants.container}
                initial="hidden"
                animate={controls}
                className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-4 text-white xl:mx-20 2xl:mx-30 relative z-10">

                <motion.div
                    variants={variants.card}
                    custom={0}
                    {...cardHoverProps}
                    className="col-span-2 flex flex-col md:flex-row lg:items-center row-span-2 bg-[#0F0F0F]/50 h-[384px] rounded-2xl border border-[#FFFFFF]/31 relative overflow-hidden p-6 shadow-lg hover:shadow-[0_0_15px_rgba(129,88,201,0.2)] transition-shadow duration-300">
                    <motion.div
                        variants={variants.content}
                        className="z-10"
                    >
                        <div className='space-y-5 md:ml-10 font-bold'>
                            <p className='text-white/60'>The Inside Scoop</p>
                            <h1 className='text-[24px] md:text-4xl'>
                                Currently building a
                                <br />
                                JS Animation library
                            </h1>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        variants={variants.image}
                    >
                        <Image
                            src={card1}
                            alt='Animation library preview'
                            className='absolute md:right-0 bottom-0'
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={variants.card}
                    custom={1}
                    {...cardHoverProps}
                    className="row-span-2 col-start-3 bg-[#0F0F0F]/50 rounded-2xl z-10 border border-[#FFFFFF]/31 h-[384px] p-6 flex items-center">
                    <motion.div
                        variants={variants.content}
                        className='w-full'>
                        <h1 className='text-center text-2xl md:text-3xl font-bold'>
                            GUI Focused on User Experience
                        </h1>
                        <p className='text-center my-3 text-white/78 px-4'>
                            our Intuive make it incredibly easy to use
                        </p>
                        <motion.div
                            variants={variants.image}
                        >
                            <Image
                                src={card2}
                                alt='card2'
                                className='mx-auto max-h-[200px] object-contain' />
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={variants.card}
                    custom={2}
                    {...cardHoverProps}
                    className="col-span-2 row-span-2 col-start-2 row-start-3 rounded-2xl bg-[#0F0F0F]/50 h-[384px] z-10 border border-[#FFFFFF]/31">
                    <div className='p-8 h-full flex flex-col md:flex-row md:items-center gap-8'>
                        <motion.div
                            variants={variants.content}
                            className='md:w-1/2 text-center md:text-start'>
                            <p className='text-white/78'>
                                i constantly try to improve
                            </p>
                            <h1 className='text-3xl md:text-4xl font-bold 2xl:text-5xl'>
                                My Tech Stack
                            </h1>
                        </motion.div>

                        <div className='flex gap-4 md:gap-8 md:w-2/3 overflow-hidden'>
                            {[0, 1].map((columnIndex) => (
                                <TechStackColumn key={columnIndex} columnIndex={columnIndex} techStack={duplicatedStack} />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={variants.card}
                    custom={3}
                    {...cardHoverProps}
                    className="row-span-2 col-start-1 row-start-3 rounded-2xl bg-[#0F0F0F]/50 z-10 border border-[#FFFFFF]/31 h-[384px] p-6 flex flex-col justify-center items-center">
                    <motion.div 
                        className='w-full text-center'
                        variants={variants.content}
                    >
                        <h1 className='text-2xl md:text-3xl font-bold mb-3'>Ai Support</h1>
                        <p className='text-white/78 px-4'>
                            i can build simple AI agent to improve the user experience
                        </p>
                    </motion.div>
                    <motion.div
                        variants={variants.image}
                        whileHover={{ 
                            rotate: [0, -5, 5, -5, 0],
                            transition: { duration: 0.5 }
                        }}
                    >
                        <Image
                            src={card3}
                            alt='card3'
                            className='mx-auto mt-4 max-h-[200px] object-contain'
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
});

Cards.displayName = 'Cards';