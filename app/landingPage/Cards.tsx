"use client";
import Image from 'next/image'
import { motion } from 'framer-motion';
import blue from '../../public/blue.png'
import purp from '../../public/purp.png'
import card1 from '../../public/card1.png'
import card2 from '../../public/card2.png'
import card3 from '../../public/card3.svg'


export const Cards = () => {
    const techStack = [
        "ReactJS", "NextJS", "Express", "MongoDB", "TypeScript", 
        "Tailwind", "JavaScript" , "Angular" , "Bootstrap" , "nodejs"
    ];

    const duplicatedStack = [...techStack, ...techStack];

    return (
        <section>

            <Image
                src={purp}
                alt='Purple gradient'
                className='absolute bottom-0.5 right-0 z-0'
            />

            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-4 text-white mr-10 xl:mx-20 2xl:mx-30">
                <div className="col-span-2 flex flex-col md:flex-row items-center row-span-2 bg-[#0F0F0F]/50 h-[384px] rounded-2xl border border-[#FFFFFF]/31 relative overflow-hidden p-6">
                    <div className='space-y-5 md:ml-10 font-bold z-10'>
                        <p className='text-white/60'>The Inside Scoop</p>
                        <h1 className='text-[24px] md:text-4xl'>
                            Currently building a
                            <br />
                            JS Animation library
                        </h1>
                    </div>
                    <Image
                        src={card1}
                        alt='Animation library preview'
                        className='absolute md:right-0 bottom-0'
                    />
                </div>

                <div className="row-span-2 col-start-3 bg-[#0F0F0F]/50 rounded-2xl z-4 border border-[#FFFFFF]/31 h-[384px] p-6 flex items-center">
                    <div className='w-full'>
                        <h1 className='text-center text-2xl md:text-3xl font-bold'>
                            GUI Focused on User Experience
                        </h1>
                        <p className='text-center my-3 text-white/78 px-4'>
                            our Intuive make it incredibly easy to use
                        </p>
                        <Image
                            src={card2}
                            alt='card2'
                            className='mx-auto max-h-[200px] object-contain' />
                    </div>
                </div>

                <div className="col-span-2 row-span-2 col-start-2 row-start-3 rounded-2xl bg-[#0F0F0F]/50 h-[384px] z-4 border border-[#FFFFFF]/31">
                    <div className='p-8 h-full flex flex-col md:flex-row md:items-center gap-8'>
                        <div className='md:w-1/2 text-center md:text-start'>
                            <p className='text-white/78'>
                                i constantly try to improve
                            </p>
                            <h1 className='text-3xl md:text-4xl font-bold  2xl:text-5xl'>
                                My Tech Stack
                            </h1>
                        </div>
                        
                        <div className='flex gap-4 md:gap-8 md:w-2/3 overflow-hidden '>
                            <div className='relative h-[250px] md:h-[380px] overflow-hidden w-1/2'>
                                <motion.div
                                    initial={{ y: 0 }}
                                    animate={{ y: "-50%" }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className='flex flex-col gap-4'
                                >
                                    {duplicatedStack.map((tech, index) => (
                                        <motion.div
                                            key={index}
                                            className='bg-[#1A1A1A] rounded-lg p-4 md:p-6 text-center'
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            {tech}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            <div className='relative h-[250px] md:h-[380px] overflow-hidden w-1/2'>
                                <motion.div
                                    initial={{ y: "-50%" }}
                                    animate={{ y: "0" }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className='flex flex-col gap-4'
                                >
                                    {duplicatedStack.map((tech, index) => (
                                        <motion.div
                                            key={index}
                                            className='bg-[#1A1A1A] rounded-lg p-4 md:p-6 text-center'
                                            whileHover={{ scale: 1.01  }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            {tech}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row-span-2 col-start-1 row-start-3 rounded-2xl bg-[#0F0F0F]/50 z-4 border border-[#FFFFFF]/31 h-[384px] p-6 flex items-center">
                    <div className='w-full text-center'>
                        <h1 className='text-2xl   md:text-3xl font-bold mb-3'>Ai Support</h1>
                        <p className='text-white/78 px-4'>
                            i can build simple AI agent to improve the user experience
                        </p>
                        <Image
                            src={card3}
                            alt='card3'
                            className='mx-auto mt-4 max-h-[200px] object-contain' />
                    </div>
                </div>
                <Image
                    src={blue}
                    alt='Blue gradient'
                    className='absolute left-0 z-0'
                />
            </div>
        </section>
    );
}